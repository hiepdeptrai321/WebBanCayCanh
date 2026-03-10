You are a frontend developer working on a React + Vite + TailwindCSS project.

Create a **Header + Hero top section** for a plant shop homepage, inspired by a premium minimal garden website.

Important:
Do NOT copy exact content from any real website.
Only create a similar layout style and visual structure.

Use React functional components and TailwindCSS only.

The visible content must be in Vietnamese.

-------------------------------------
1. HEADER REQUIREMENTS
-------------------------------------

Create a fixed or top header with a clean minimal design.

Header layout:
- White background
- Large horizontal space
- Centered logo block that overlaps slightly with the hero banner below
- Menu button on the top-right corner
- Optional empty spacing on the left to keep the composition balanced

The logo should:
- appear as a green square block
- contain brand text like:
  "JOY"
  "GARDEN"
- look centered and elegant
- sit partly inside the white header area and partly overlap the banner image below

The menu button:
- should be a minimal hamburger icon
- placed at the top-right
- black or dark gray color
- should be prepared to trigger the fullscreen overlay menu from earlier

Create these components:
- Header.jsx
- LogoBlock.jsx

-------------------------------------
2. HERO TOP SECTION REQUIREMENTS
-------------------------------------

Create a large hero banner directly below the header.

Style:
- full-width background image of green leaves / tropical plants
- elegant and premium
- natural, fresh, clean
- large horizontal composition

Overlay text should be centered or slightly right-centered on the banner.

Hero content in Vietnamese:

Main title:
"Không gian xanh cho cuộc sống hiện đại"

Subtitle:
"Cây cảnh đẹp - giải pháp trang trí và thư giãn cho ngôi nhà của bạn"

Optional smaller brand line:
"PLANT SHOP"

Typography:
- large bold heading
- white text
- high contrast against the image
- elegant spacing

Add a subtle dark overlay on the banner image if needed so the text is readable.

Create component:
- HeroTopSection.jsx

-------------------------------------
3. LOCATION / SHOWROOM INFO STRIP
-------------------------------------

Under the hero banner, create a horizontal information strip with 3 columns.

This strip should have:
- light background
- centered content
- enough spacing vertically and horizontally

The three columns should be:

Column 1:
"Showroom"
"12 Nguyễn Văn Bảo, Gò Vấp, TP.HCM"

Column 2:
"Kho hàng"
"25 Lê Văn Việt, Thủ Đức, TP.HCM"

Column 3:
"Vườn ươm"
"Khu nông nghiệp công nghệ cao, Củ Chi"

Style:
- title a bit darker and more prominent
- address text smaller and gray
- clean, minimal, balanced

Create component:
- LocationStrip.jsx

-------------------------------------
4. COMPONENT STRUCTURE
-------------------------------------

Use this structure:

src/components/layout/
- Header.jsx
- LogoBlock.jsx

src/pages/Home/components/
- HeroTopSection.jsx
- LocationStrip.jsx

Then show how to assemble them in:
- HomePage.jsx

-------------------------------------
5. RESPONSIVE REQUIREMENTS
-------------------------------------

Desktop:
- logo centered and overlapping banner
- menu icon at top-right
- hero text large and elegant
- location strip in 3 columns

Tablet:
- keep strong hierarchy
- slightly smaller banner text

Mobile:
- header more compact
- logo smaller
- location strip stacked vertically
- text stays readable

-------------------------------------
6. DESIGN FEEL
-------------------------------------

The UI should feel:
- premium
- minimal
- natural
- airy
- modern
- plant/lifestyle inspired

Color direction:
- white
- green
- dark text
- soft gray backgrounds

-------------------------------------
7. TECHNICAL REQUIREMENTS
-------------------------------------

- Use React functional components
- Use TailwindCSS only
- Do not use external UI libraries
- Do not add backend logic
- Keep the code clean and reusable
- Use placeholder image URLs if needed
- Focus only on UI structure

-------------------------------------
8. EXPECTED OUTPUT
-------------------------------------

Generate complete React component code for:
- LogoBlock.jsx
- Header.jsx
- HeroTopSection.jsx
- LocationStrip.jsx
- HomePage.jsx

The result should visually resemble a premium plant shop homepage header and top banner.