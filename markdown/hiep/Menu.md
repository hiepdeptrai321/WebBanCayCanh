You are a frontend developer working on a React + Vite + TailwindCSS project.

Create a **full-screen overlay menu** for a plant shop website.

Requirements:

1. HEADER
- Create a header with:
  - logo on the left
  - a menu button on the right
- When clicking the menu button, open a full-screen overlay menu.
- When clicking the close button (X), close the menu.

2. OVERLAY MENU STYLE
- The overlay must cover the entire screen.
- Background color: very light gray.
- Layout similar to a premium minimal plant/lifestyle website.
- Clean, modern, spacious design.
- Use a lot of white space.
- Smooth open/close transition.
- The overlay should appear above all content.

3. OVERLAY MENU LAYOUT
Split the overlay into 2 columns on desktop:

LEFT SIDE:
- Centered vertically
- Show a large plant shop logo or brand text
- Under the logo, show one small social media icon button
- Under that, show a copyright text:
  "Copyright © 2026 Plant Shop. All rights reserved"

RIGHT SIDE:
- Show navigation links in a vertical list
- Links must be aligned cleanly and spaced far apart
- The active menu item should use green text
- Other menu items use dark gray text
- Add hover effect to links

4. MENU ITEMS
Use Vietnamese content:

- Trang chủ
- Sản phẩm
- Cửa hàng
- Dịch vụ thuê cây
- Thiết kế ban công
- Dịch vụ cảnh quan
- Dự án
- Kiến thức cây cảnh
- Liên hệ

5. CLOSE BUTTON
- Place a large "X" close button at the top-right corner of the overlay
- Make it minimal and elegant
- Clicking it closes the overlay

6. RESPONSIVE
- On desktop: 2-column layout
- On mobile: stack into 1 column
- Keep spacing elegant on all screen sizes

7. TECHNICAL REQUIREMENTS
- Use React functional components
- Use TailwindCSS only
- Use `useState` to control open/close
- Create these components:
  - Header.jsx
  - FullscreenMenu.jsx
- Header should manage the menu state or pass props cleanly
- Add basic transition/animation using Tailwind classes

8. UI FEEL
The design should feel:
- minimal
- elegant
- premium
- nature-inspired
- airy
- modern

9. IMPORTANT
- Do not implement backend logic
- Do not use external UI libraries
- Only create the UI and menu interaction
- Use Vietnamese text for all visible content

10. EXPECTED OUTPUT
Generate complete React component code for:
- Header.jsx
- FullscreenMenu.jsx

Also show how to use the Header component inside App.jsx or MainLayout.jsx.