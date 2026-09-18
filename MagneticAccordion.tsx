/**
 * Made with 💛 by Karim Saif
 * Created and customized for Framer by Karim Saif
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

"use client"

import * as React from "react"
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
    type MotionValue,
} from "motion/react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

const COMPONENT_AUTHOR = "Karim Saif" as const

type Item = {
    question: string
    answer: string
}

type Props = {
    items: Item[]
    backgroundColor: string
    rowColor: string
    activeRowColor: string
    borderColor: string
    textColor: string
    answerColor: string
    iconColor: string
    fontSize: number
    answerSize: number
    rowPadding: number
    gap: number
    radius: number
    borderWidth: number
    magneticStrength: number
    magneticRadius: number
    magneticDistance: number
    magneticScale: number
    textShift: number
    iconFollow: number
    openOnHover: boolean
    openOnClick: boolean
    allowMultiple: boolean
    springStiffness: number
    springDamping: number
    animationDuration: number
    showIcon: boolean
    iconSize: number
    iconStroke: number
    iconRotation: number
    hoverLift: number
    disabled: boolean
}

const defaultItems: Item[] = [
    {
        question: "What is a Framer Code Component?",
        answer: "A Code Component is a reusable React component that can be customized directly inside Framer.",
    },
    {
        question: "Can I customize the magnetic effect?",
        answer: "Yes. Adjust the magnetic strength, radius, distance, text movement, icon movement, and spring settings.",
    },
    {
        question: "Does it work on mobile?",
        answer: "Yes. The cursor-based magnetic interaction is automatically disabled on touch devices while the accordion remains fully usable.",
    },
    {
        question: "Can I use it for an FAQ?",
        answer: "Yes. Add your questions and answers through the Items property and style the component to match your site.",
    },
]

function useTouchDevice() {
    const [isTouchDevice, setIsTouchDevice] = React.useState(false)

    React.useEffect(() => {
        if (typeof window === "undefined") return

        const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)")

        const update = () => {
            setIsTouchDevice(mediaQuery.matches)
        }

        update()

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", update)

            return () => {
                mediaQuery.removeEventListener("change", update)
            }
        }

        mediaQuery.addListener(update)

        return () => {
            mediaQuery.removeListener(update)
        }
    }, [])

    return isTouchDevice
}

function MagneticIcon({
    open,
    pointerX,
    pointerY,
    color,
    size,
    stroke,
    rotation,
    disabled,
}: {
    open: boolean
    pointerX: MotionValue<number>
    pointerY: MotionValue<number>
    color: string
    size: number
    stroke: number
    rotation: number
    disabled: boolean
}) {
    const pointerAngle = useTransform([pointerX, pointerY], ([x, y]) => {
        const px = Number(x)
        const py = Number(y)

        if (px === 0 && py === 0) return 0

        return Math.atan2(py, px) * (180 / Math.PI)
    })

    const iconRotation = useTransform(pointerAngle, (angle) => {
        if (disabled) return 0
        if (open) return rotation
        return angle * 0.16
    })

    return (
        <motion.span
            style={{
                width: size,
                height: size,
                flex: "0 0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color,
                rotate: iconRotation,
            }}
            aria-hidden="true"
        >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <path
                    d={open ? "M5 12h14" : "M12 5v14M5 12h14"}
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                />
            </svg>
        </motion.span>
    )
}

function MagneticRow({
    item,
    index,
    open,
    setOpen,
    props,
    reducedMotion,
    isStatic,
    isTouchDevice,
}: {
    item: Item
    index: number
    open: boolean
    setOpen: (index: number) => void
    props: Props
    reducedMotion: boolean
    isStatic: boolean
    isTouchDevice: boolean
}) {
    const rowRef = React.useRef<HTMLDivElement>(null)
    const pointerX = useMotionValue(0)
    const pointerY = useMotionValue(0)
    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)

    const springX = useSpring(rawX, {
        stiffness: props.springStiffness,
        damping: props.springDamping,
        mass: 0.55,
    })

    const springY = useSpring(rawY, {
        stiffness: props.springStiffness,
        damping: props.springDamping,
        mass: 0.55,
    })

    const textX = useTransform(
        springX,
        [-props.magneticDistance, props.magneticDistance],
        [-props.textShift, props.textShift]
    )

    const textY = useTransform(
        springY,
        [-props.magneticDistance, props.magneticDistance],
        [-props.textShift, props.textShift]
    )

    const iconX = useTransform(
        springX,
        [-props.magneticDistance, props.magneticDistance],
        [-props.iconFollow, props.iconFollow]
    )

    const iconY = useTransform(
        springY,
        [-props.magneticDistance, props.magneticDistance],
        [-props.iconFollow, props.iconFollow]
    )

    const [magneticActive, setMagneticActive] = React.useState(false)

    const resetMagnet = React.useCallback(() => {
        rawX.set(0)
        rawY.set(0)
        pointerX.set(0)
        pointerY.set(0)
        setMagneticActive(false)
    }, [rawX, rawY, pointerX, pointerY])

    const handlePointerMove = React.useCallback(
        (event: React.PointerEvent<HTMLDivElement>) => {
            if (
                isStatic ||
                reducedMotion ||
                props.disabled ||
                isTouchDevice ||
                !rowRef.current
            ) {
                return
            }

            const rect = rowRef.current.getBoundingClientRect()
            const localX = event.clientX - rect.left - rect.width / 2
            const localY = event.clientY - rect.top - rect.height / 2
            const distance = Math.sqrt(localX * localX + localY * localY)

            if (distance > props.magneticRadius) {
                resetMagnet()
                return
            }

            const falloff = Math.max(
                0,
                1 - distance / Math.max(props.magneticRadius, 1)
            )

            const widthFactor = Math.max(rect.width / 2, 1)
            const heightFactor = Math.max(rect.height / 2, 1)
            const directionX = localX / widthFactor
            const directionY = localY / heightFactor

            const movementX =
                directionX *
                props.magneticDistance *
                props.magneticStrength *
                falloff

            const movementY =
                directionY *
                props.magneticDistance *
                props.magneticStrength *
                falloff

            rawX.set(movementX)
            rawY.set(movementY)
            pointerX.set(localX)
            pointerY.set(localY)
            setMagneticActive(true)
        },
        [
            isStatic,
            reducedMotion,
            props.disabled,
            props.magneticRadius,
            props.magneticDistance,
            props.magneticStrength,
            isTouchDevice,
            rawX,
            rawY,
            pointerX,
            pointerY,
            resetMagnet,
        ]
    )

    const handlePointerEnter = React.useCallback(() => {
        if (isStatic || reducedMotion || props.disabled || isTouchDevice) {
            return
        }

        setMagneticActive(true)

        if (props.openOnHover) {
            setOpen(index)
        }
    }, [
        isStatic,
        reducedMotion,
        props.disabled,
        isTouchDevice,
        props.openOnHover,
        setOpen,
        index,
    ])

    const handlePointerLeave = React.useCallback(() => {
        resetMagnet()
    }, [resetMagnet])

    const handleClick = React.useCallback(() => {
        if (props.disabled || !props.openOnClick) return
        setOpen(index)
    }, [props.disabled, props.openOnClick, setOpen, index])

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLButtonElement>) => {
            if (props.disabled || !props.openOnClick) return

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setOpen(index)
            }
        },
        [props.disabled, props.openOnClick, setOpen, index]
    )

    const rowScale =
        reducedMotion || isStatic || !magneticActive ? 1 : props.magneticScale

    const rowY =
        reducedMotion || isStatic || !magneticActive ? 0 : -props.hoverLift

    const answerId = `magnetic-accordion-answer-${index}`

    return (
        <div
            ref={rowRef}
            style={{
                width: "100%",
                position: "relative",
                boxSizing: "border-box",
            }}
            onPointerMove={handlePointerMove}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <motion.div
                animate={{
                    scale: rowScale,
                    y: rowY,
                    backgroundColor: open
                        ? props.activeRowColor
                        : props.rowColor,
                }}
                transition={{
                    type: "spring",
                    stiffness: props.springStiffness,
                    damping: props.springDamping,
                    mass: 0.6,
                }}
                style={{
                    width: "100%",
                    position: "relative",
                    borderRadius: props.radius,
                    border: `${props.borderWidth}px solid ${props.borderColor}`,
                    boxSizing: "border-box",
                    overflow: "hidden",
                    transformOrigin: "center",
                    willChange: reducedMotion ? "auto" : "transform",
                }}
            >
                <motion.button
                    type="button"
                    disabled={props.disabled}
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        appearance: "none",
                        WebkitAppearance: "none",
                        background: "transparent",
                        color: "inherit",
                        font: "inherit",
                        textAlign: "left",
                        padding: props.rowPadding,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 20,
                        cursor: props.disabled ? "default" : "pointer",
                        boxSizing: "border-box",
                    }}
                >
                    <motion.span
                        style={{
                            x: reducedMotion || isStatic ? 0 : textX,
                            y: reducedMotion || isStatic ? 0 : textY,
                            flex: 1,
                            minWidth: 0,
                            display: "block",
                            fontSize: props.fontSize,
                            lineHeight: 1.2,
                            fontWeight: 600,
                            color: props.textColor,
                            wordBreak: "break-word",
                        }}
                    >
                        {item.question}
                    </motion.span>

                    {props.showIcon && (
                        <motion.span
                            style={{
                                x: reducedMotion || isStatic ? 0 : iconX,
                                y: reducedMotion || isStatic ? 0 : iconY,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MagneticIcon
                                open={open}
                                pointerX={pointerX}
                                pointerY={pointerY}
                                color={props.iconColor}
                                size={props.iconSize}
                                stroke={props.iconStroke}
                                rotation={props.iconRotation}
                                disabled={
                                    reducedMotion || isStatic || props.disabled
                                }
                            />
                        </motion.span>
                    )}
                </motion.button>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            id={answerId}
                            key="answer"
                            role="region"
                            aria-label={item.question}
                            initial={
                                reducedMotion
                                    ? { opacity: 1 }
                                    : { height: 0, opacity: 0 }
                            }
                            animate={{ height: "auto", opacity: 1 }}
                            exit={
                                reducedMotion
                                    ? { opacity: 0 }
                                    : { height: 0, opacity: 0 }
                            }
                            transition={{
                                duration: reducedMotion
                                    ? 0
                                    : props.animationDuration,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ overflow: "hidden" }}
                        >
                            <div
                                style={{
                                    padding: `0 ${props.rowPadding}px ${props.rowPadding}px`,
                                    boxSizing: "border-box",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        height: 1,
                                        marginBottom: props.rowPadding,
                                        backgroundColor: props.borderColor,
                                        opacity: 0.7,
                                    }}
                                />

                                <motion.div
                                    initial={
                                        reducedMotion
                                            ? { opacity: 1, y: 0 }
                                            : { opacity: 0, y: 8 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{
                                        duration: reducedMotion
                                            ? 0
                                            : props.animationDuration * 0.8,
                                    }}
                                    style={{
                                        color: props.answerColor,
                                        fontSize: props.answerSize,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {item.answer}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default function MagneticAccordion(props: Props) {
    const isStatic = useIsStaticRenderer()
    const reducedMotion = useReducedMotion() || false
    const isTouchDevice = useTouchDevice()
    const [openItems, setOpenItems] = React.useState<number[]>([])

    const items =
        Array.isArray(props.items) && props.items.length > 0
            ? props.items
            : defaultItems

    const setOpen = React.useCallback(
        (index: number) => {
            if (props.disabled) return

            if (props.allowMultiple) {
                setOpenItems((current) =>
                    current.includes(index)
                        ? current.filter((item) => item !== index)
                        : [...current, index]
                )
                return
            }

            setOpenItems((current) =>
                current.includes(index) ? [] : [index]
            )
        },
        [props.disabled, props.allowMultiple]
    )

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minWidth: 0,
                minHeight: 0,
                boxSizing: "border-box",
                backgroundColor: props.backgroundColor,
                overflow: "visible",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    minWidth: 0,
                    minHeight: 0,
                    boxSizing: "border-box",
                    overflow: "visible",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        minWidth: 0,
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        gap: props.gap,
                    }}
                >
                    {items.map((item, index) => (
                        <MagneticRow
                            key={`${index}-${item.question}`}
                            item={item}
                            index={index}
                            open={openItems.includes(index)}
                            setOpen={setOpen}
                            props={props}
                            reducedMotion={reducedMotion}
                            isStatic={isStatic}
                            isTouchDevice={isTouchDevice}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

MagneticAccordion.displayName = "Magnetic Accordion"

MagneticAccordion.defaultProps = {
    items: defaultItems,
    backgroundColor: "#050505",
    rowColor: "#111111",
    activeRowColor: "#181818",
    borderColor: "#2A2A2A",
    textColor: "#FFFFFF",
    answerColor: "#A8A8A8",
    iconColor: "#FFFFFF",
    fontSize: 18,
    answerSize: 15,
    rowPadding: 24,
    gap: 10,
    radius: 18,
    borderWidth: 1,
    magneticStrength: 0.65,
    magneticRadius: 260,
    magneticDistance: 18,
    magneticScale: 1.015,
    textShift: 5,
    iconFollow: 9,
    openOnHover: false,
    openOnClick: true,
    allowMultiple: false,
    springStiffness: 260,
    springDamping: 24,
    animationDuration: 0.38,
    showIcon: true,
    iconSize: 22,
    iconStroke: 1.7,
    iconRotation: 0,
    hoverLift: 2,
    disabled: false,
}

addPropertyControls(MagneticAccordion, {
    items: {
        type: ControlType.Array,
        title: "Items",
        description: "Questions and answers displayed as magnetic accordion rows.",
        control: {
            type: ControlType.Object,
            controls: {
                question: {
                    type: ControlType.String,
                    title: "Question",
                    defaultValue: "What is a Framer Code Component?",
                    description: "The question displayed in the accordion row.",
                },
                answer: {
                    type: ControlType.String,
                    title: "Answer",
                    defaultValue: "A Code Component is a reusable React component that can be customized directly inside Framer.",
                    displayTextArea: true,
                    description: "The answer revealed when the row opens.",
                },
            },
        },
        defaultValue: defaultItems,
        maxCount: 20,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#050505",
        description: "Background color behind the complete accordion.",
    },
    rowColor: {
        type: ControlType.Color,
        title: "Row",
        defaultValue: "#111111",
        description: "Background color used by closed accordion rows.",
    },
    activeRowColor: {
        type: ControlType.Color,
        title: "Active Row",
        defaultValue: "#181818",
        description: "Background color used by an opened accordion row.",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border",
        defaultValue: "#2A2A2A",
        description: "Color of the border and divider inside each row.",
    },
    textColor: {
        type: ControlType.Color,
        title: "Question",
        defaultValue: "#FFFFFF",
        description: "Color of the question text.",
    },
    answerColor: {
        type: ControlType.Color,
        title: "Answer",
        defaultValue: "#A8A8A8",
        description: "Color of the revealed answer text.",
    },
    iconColor: {
        type: ControlType.Color,
        title: "Icon",
        defaultValue: "#FFFFFF",
        description: "Color of the plus and minus icon.",
    },
    fontSize: {
        type: ControlType.Number,
        title: "Question Size",
        defaultValue: 18,
        min: 10,
        max: 48,
        step: 1,
        unit: "px",
        description: "Font size of the accordion questions.",
    },
    answerSize: {
        type: ControlType.Number,
        title: "Answer Size",
        defaultValue: 15,
        min: 10,
        max: 32,
        step: 1,
        unit: "px",
        description: "Font size of the revealed answers.",
    },
    rowPadding: {
        type: ControlType.Number,
        title: "Row Padding",
        defaultValue: 24,
        min: 8,
        max: 80,
        step: 1,
        unit: "px",
        description: "Inner spacing around the content of each row.",
    },
    gap: {
        type: ControlType.Number,
        title: "Gap",
        defaultValue: 10,
        min: 0,
        max: 60,
        step: 1,
        unit: "px",
        description: "Vertical spacing between accordion rows.",
    },
    radius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 18,
        min: 0,
        max: 60,
        step: 1,
        unit: "px",
        description: "Corner radius applied to each accordion row.",
    },
    borderWidth: {
        type: ControlType.Number,
        title: "Border Width",
        defaultValue: 1,
        min: 0,
        max: 4,
        step: 0.5,
        unit: "px",
        description: "Thickness of each accordion row border.",
    },
    magneticStrength: {
        type: ControlType.Number,
        title: "Magnetic Strength",
        defaultValue: 0.65,
        min: 0,
        max: 2,
        step: 0.05,
        description: "Controls the intensity of the cursor attraction.",
    },
    magneticRadius: {
        type: ControlType.Number,
        title: "Magnetic Radius",
        defaultValue: 260,
        min: 50,
        max: 600,
        step: 10,
        unit: "px",
        description: "Distance from the row where the magnetic field begins and ends.",
    },
    magneticDistance: {
        type: ControlType.Number,
        title: "Magnetic Distance",
        defaultValue: 18,
        min: 0,
        max: 80,
        step: 1,
        unit: "px",
        description: "Maximum physical distance the row can move toward the cursor.",
    },
    magneticScale: {
        type: ControlType.Number,
        title: "Magnetic Scale",
        defaultValue: 1.015,
        min: 1,
        max: 1.08,
        step: 0.001,
        description: "Subtle scale applied while the cursor is inside the magnetic field.",
    },
    textShift: {
        type: ControlType.Number,
        title: "Text Shift",
        defaultValue: 5,
        min: 0,
        max: 30,
        step: 1,
        unit: "px",
        description: "Maximum distance the question text follows the magnetic movement.",
    },
    iconFollow: {
        type: ControlType.Number,
        title: "Icon Follow",
        defaultValue: 9,
        min: 0,
        max: 40,
        step: 1,
        unit: "px",
        description: "Maximum distance the icon follows the cursor movement.",
    },
    openOnHover: {
        type: ControlType.Boolean,
        title: "Open on Hover",
        defaultValue: false,
        description: "Automatically opens a row when the pointer enters it.",
    },
    openOnClick: {
        type: ControlType.Boolean,
        title: "Open on Click",
        defaultValue: true,
        description: "Allows users to open and close rows by clicking or pressing Enter or Space.",
    },
    allowMultiple: {
        type: ControlType.Boolean,
        title: "Multiple Open",
        defaultValue: false,
        description: "Allows multiple accordion answers to stay open at the same time.",
    },
    springStiffness: {
        type: ControlType.Number,
        title: "Spring Stiffness",
        defaultValue: 260,
        min: 50,
        max: 800,
        step: 10,
        description: "Controls how quickly the magnetic movement responds to the cursor.",
    },
    springDamping: {
        type: ControlType.Number,
        title: "Spring Damping",
        defaultValue: 24,
        min: 5,
        max: 80,
        step: 1,
        description: "Controls how quickly the magnetic movement settles after the cursor moves away.",
    },
    animationDuration: {
        type: ControlType.Number,
        title: "Open Duration",
        defaultValue: 0.38,
        min: 0.1,
        max: 1.5,
        step: 0.05,
        unit: "s",
        description: "Duration of the accordion answer reveal and closing animation.",
    },
    showIcon: {
        type: ControlType.Boolean,
        title: "Show Icon",
        defaultValue: true,
        description: "Shows or hides the magnetic plus and minus icon.",
    },
    iconSize: {
        type: ControlType.Number,
        title: "Icon Size",
        defaultValue: 22,
        min: 10,
        max: 48,
        step: 1,
        unit: "px",
        description: "Size of the accordion plus and minus icon.",
    },
    iconStroke: {
        type: ControlType.Number,
        title: "Icon Stroke",
        defaultValue: 1.7,
        min: 0.5,
        max: 5,
        step: 0.1,
        description: "Thickness of the icon stroke.",
    },
    iconRotation: {
        type: ControlType.Number,
        title: "Open Rotation",
        defaultValue: 0,
        min: -180,
        max: 180,
        step: 1,
        unit: "deg",
        description: "Rotation applied to the icon while its row is open.",
    },
    hoverLift: {
        type: ControlType.Number,
        title: "Hover Lift",
        defaultValue: 2,
        min: 0,
        max: 15,
        step: 0.5,
        unit: "px",
        description: "Vertical lift applied while the cursor interacts with a row.",
    },
    disabled: {
        type: ControlType.Boolean,
        title: "Disabled",
        defaultValue: false,
        description: "Disables cursor interaction and accordion opening.",
    },
})
