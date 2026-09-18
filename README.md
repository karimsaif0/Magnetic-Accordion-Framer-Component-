# 🧲 Magnetic Accordion — Framer Component

A magnetic, cursor-reactive accordion for Framer.

**Cursor → Pull → Stretch → Open.**

Magnetic Accordion transforms a familiar FAQ pattern into a tactile interaction. Each row responds to the pointer with a configurable magnetic field, spring physics, subtle scale, question movement, cursor-following icon motion, and smooth answer reveals.

Built for modern Framer websites, landing pages, portfolios, agencies, SaaS products, studios, and interactive FAQ sections.

## ✨ Preview

https://magneticaccordion.framer.website/

## 🛒 Get the Component

https://karimsaif.lemonsqueezy.com/checkout/buy/78cf8f1d-8c95-4dde-b044-332bad41316f

## 💬 Framer Community

https://www.framer.com/community/posts/GR8yR1E8FRezdLGjzYLcne/

---

## ⚡ What Makes It Magnetic?

Traditional accordion interactions are mostly static: hover, click, open, close.

Magnetic Accordion adds another layer of interaction.

As the cursor approaches a row, the row detects the pointer position and calculates a magnetic falloff. The closer the cursor is to the magnetic field, the stronger the movement becomes.

The row can:

- Pull toward the cursor
- Gently scale
- Lift upward
- Move its question text
- Move its icon
- Rotate the icon according to cursor direction
- Spring back naturally when the pointer leaves

Clicking the row then reveals the answer with a smooth animated expansion.

The result is a small but expressive interaction that makes a standard FAQ feel more physical.

---

## 🎯 Great For

### FAQ Sections
Create interactive FAQ blocks that feel more responsive than traditional accordion components.

### SaaS Websites
Use it for product questions, onboarding information, feature explanations, pricing FAQs, and support content.

### Creative Portfolios
Add a tactile interaction to portfolio pages, case studies, and personal websites.

### Agencies & Studios
Use magnetic rows for services, capabilities, processes, and studio information.

### Product Websites
Present specifications, feature details, product information, and common questions in a compact layout.

### Landing Pages
Add an interactive information section without overwhelming the page with content.

### Interactive Content
The component can also be adapted for services, processes, capabilities, support sections, or expandable project information.

---

## 🚀 Features

### 🧲 Magnetic Cursor Field
Each row reacts to the cursor inside a configurable magnetic radius.

### 💪 Adjustable Magnetic Strength
Control how strongly each row is attracted toward the pointer.

### 📐 Magnetic Distance
Set the maximum distance the row can travel toward the cursor.

### 🔍 Magnetic Scale
Add a subtle scale effect while the magnetic interaction is active.

### ↔️ Text Shift
The question text can independently follow the magnetic movement.

### 🧭 Icon Follow
The icon can move toward the cursor independently from the row.

### 🔄 Cursor Direction
The icon responds to the pointer direction when the row is closed.

### 🌊 Spring Physics
Tune stiffness and damping to create a tighter or softer physical response.

### ⬆️ Hover Lift
Give the active row a subtle vertical lift.

### 📖 Smooth Answer Reveal
Answers animate open and closed with height and opacity transitions.

### 🖱️ Click Interaction
Users can open and close rows with a pointer.

### ⌨️ Keyboard Interaction
Rows support Enter and Space keyboard interaction when click opening is enabled.

### 👥 Multiple Open Mode
Allow one answer at a time or keep multiple answers open.

### 🖐️ Touch Support
Cursor-based magnetic interaction is automatically disabled on touch-oriented devices while the accordion remains usable.

### ♿ Reduced Motion
The component respects the user's reduced-motion preference and removes unnecessary interaction motion when requested.

### 🧱 Static Rendering
Static-renderer handling prevents interactive magnetic behavior from unnecessarily running in Framer's static rendering environment.

### 📱 Responsive Layout
The component uses the available Framer frame width and is designed for responsive layouts.

### 🎨 Fully Customizable
Colors, spacing, typography, magnetic behavior, physics, animation, and icon settings are available through Framer property controls.

---

## 🎛️ Controls

### Content

**Items**  
Create and edit accordion questions and answers directly inside Framer.

### Appearance

**Background** — Background color behind the accordion.

**Row** — Color of closed rows.

**Active Row** — Color of opened rows.

**Border** — Border and internal divider color.

**Question** — Question text color.

**Answer** — Answer text color.

**Icon** — Plus/minus icon color.

### Typography & Layout

**Question Size** — Font size of questions.

**Answer Size** — Font size of answers.

**Row Padding** — Internal spacing inside each row.

**Gap** — Space between rows.

**Radius** — Corner radius of rows.

**Border Width** — Thickness of row borders.

### Magnetic

**Magnetic Strength** — Intensity of cursor attraction.

**Magnetic Radius** — Size of the cursor's influence field.

**Magnetic Distance** — Maximum row movement.

**Magnetic Scale** — Scale applied during magnetic interaction.

**Text Shift** — Question movement amount.

**Icon Follow** — Icon movement amount.

### Opening

**Open on Hover** — Opens a row when the pointer enters it.

**Open on Click** — Enables pointer and keyboard opening.

**Multiple Open** — Allows multiple answers to remain expanded.

### Physics & Animation

**Spring Stiffness** — Controls response speed.

**Spring Damping** — Controls how quickly the movement settles.

**Open Duration** — Controls answer reveal and closing speed.

### Icon

**Show Icon** — Shows or hides the icon.

**Icon Size** — Controls icon dimensions.

**Icon Stroke** — Controls stroke thickness.

**Open Rotation** — Sets the icon rotation while open.

**Hover Lift** — Controls the row's vertical lift during interaction.

### State

**Disabled** — Disables cursor interaction and accordion opening.

---

## 🧩 How It Works

The interaction follows a simple sequence:

**1. Cursor enters the magnetic field**

The component measures the pointer's position relative to the row.

**2. Magnetic falloff is calculated**

The closer the pointer is to the row's center, the stronger the movement.

**3. Spring movement responds**

The row moves toward the pointer using configurable spring physics.

**4. Internal elements react**

Question text and icon can move independently to create layered motion.

**5. The icon follows direction**

The closed icon subtly rotates according to the pointer direction.

**6. The row can open**

Clicking or keyboard interaction reveals the answer.

**7. The magnet resets**

When the pointer leaves, the movement springs back to its resting position.

---

## 📱 Desktop & Mobile

The magnetic effect is designed for pointer-based interaction.

On touch-oriented devices, the cursor-driven field is automatically disabled. The accordion remains available through normal touch interaction.

This allows the same component to be used across responsive layouts without requiring a separate mobile component.

---

## ♿ Accessibility

Magnetic Accordion uses semantic buttons for its interactive rows and exposes the expanded state with `aria-expanded`.

Answers are associated with their triggering controls through `aria-controls`.

Keyboard users can use:

- Enter
- Space

to toggle an item when click interaction is enabled.

The component also respects reduced-motion preferences.

---

## 🎨 Customization Ideas

Try a very subtle magnetic strength with a large radius for a refined studio aesthetic.

Increase magnetic distance and text shift for a more expressive interaction.

Use a stronger spring with lower damping for a playful, elastic feel.

Keep the scale close to 1 for a minimal premium interaction.

Increase the hover lift for a floating-card appearance.

Combine a dark background with slightly lighter active rows for a clean editorial FAQ.

---

## 🛠️ Installation

1. Open the component in Framer.
2. Add Magnetic Accordion to your project.
3. Set the component frame size.
4. Edit the Items property.
5. Customize colors and typography.
6. Tune the magnetic settings.
7. Adjust spring physics.
8. Publish your website.

No separate setup is required for the normal component workflow.

---

## 📁 Component Structure

The main component is contained in:

`MagneticAccordion.tsx`

The component includes:

- Framer property controls
- Magnetic pointer interaction
- Spring-based movement
- Animated accordion expansion
- Responsive layout handling
- Touch-device detection
- Reduced-motion support
- Static-renderer support
- Keyboard interaction
- Accessible accordion semantics

---

## 💛 Credits

Made with 💛 by Karim Saif

Created and customized for Framer by Karim Saif.

## 🔗 Links

**Preview:**  
https://magneticaccordion.framer.website/

**Purchase:**  
https://karimsaif.lemonsqueezy.com/checkout/buy/78cf8f1d-8c95-4dde-b044-332bad41316f

**Framer Community:**  
https://www.framer.com/community/posts/GR8yR1E8FRezdLGjzYLcne/

**X:**  
https://x.com/karimsaif0

**Email:**  
karimsaif010@gmail.com

---

## 📩 Support

For questions, customization help, or issues with the component:

**X:** https://x.com/karimsaif0

**Email:** karimsaif010@gmail.com

When reporting an issue, include your Framer setup, the settings you are using, and a short description of the behavior you are seeing.

---

## ⭐ Magnetic Accordion

A familiar accordion pattern with a physical cursor interaction.

**Cursor → Pull → Stretch → Open.**

Built for Framer by Karim Saif.
