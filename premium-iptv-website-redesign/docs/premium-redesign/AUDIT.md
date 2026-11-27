# Premium visual redesign — audit and implementation plan

## Baseline

The UI has solid information architecture and original imagery, but most sections use the same light cards, blue accents, and evenly centered headings. The large shifts from light to dark interrupt the entertainment aesthetic. The hero image feels like a separate thumbnail; pricing lacks a strong visual focal point; the mobile layout has a long rhythm of similar cards. WhatsApp links work but lack a cohesive visual treatment. Review states are honest and must remain so.

## The 25 highest-impact improvements — implemented

1. Establish a unified midnight/obsidian surface palette across the homepage.
2. Create shared elevation, border, radius, glow, and spacing tokens.
3. Increase headline scale and use tighter, editorial display typography.
4. Use restrained cyan/violet gradients for emphasis, not every surface.
5. Replace the flat navbar with a floating glass navigation shell.
6. Refine navigation hover, active menu presentation, and touch targets.
7. Compose a more immersive, asymmetric cinematic hero.
8. Layer aurora lighting, an orbital arc, and restrained particle accents behind the hero.
9. Add slow transform-only ambient orb motion with a reduced-motion fallback.
10. Add a pointer-follow spotlight with no React state updates per pointer frame.
11. Add subtle spring tilt to hero artwork on fine pointers only.
12. Strengthen primary action contrast, light reflections, and hover elevation.
13. Unify WhatsApp actions in a high-contrast emerald treatment.
14. Integrate the useful-information strip into the dark design rather than a white divider.
15. Give device imagery a luminous stage and more deliberate framing.
16. Make device cards compact, tactile, and visually consistent on mobile.
17. Introduce an editorial features layout with layered interactive glass cards.
18. Improve feature icon containers and visual hierarchy without changing their meaning.
19. Integrate sports imagery as a wide cinematic pricing banner.
20. Lift pricing cards into a coherent glass deck with aligned CTAs and price baselines.
21. Highlight the existing featured plan with a luxury luminous border, not new claims.
22. Improve comparison-table scanning, row rhythm, and featured-column contrast.
23. Redesign reviews and form surfaces with readable dark inputs and honest status states.
24. Refine FAQ groups into bordered, spacious native accordions with clear open states.
25. Finish with a cinematic WhatsApp CTA, spacious footer, and unified reveal/hover motion.

## Boundaries and motion system

All business copy, prices, feature lists, review logic, consent behavior, and navigation destinations remain unchanged. No fake indicators, reviews, counts, urgency, or claims. No backend, security, SEO, analytics, test, CI, or dependency changes. Framer Motion is already installed. Use springs for pointer interactions, one-time section reveals, and transform/opacity-only ambient motion. Disable pointer tilt/parallax on touch and reduced-motion devices; disable decorative loops under reduced motion. No scroll hijacking or large blurred layers that follow the pointer. A frame-rate target is not a universal hardware guarantee.

## Evidence

Fresh baseline captures live in `before/`; implementation captures live in `after/`, at identical desktop (1440 × 1000) and mobile (390 × 844) viewports. Review backend availability is displayed truthfully, without seeded content.
