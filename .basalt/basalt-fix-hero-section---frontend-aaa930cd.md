# Basalt remediation

## Fix Hero Section Content and Badge

The issue requires three changes in the Hero section:

1. **Update title text**: Change "shape tomorrow" to "shape your future"
2. **Update badge text**: Change "ISO Certified" to "ISO Certified ++"
3. **Remove Lucide icon** from the badge

Based on the repository context, the Landing component (frontend/src/components/Landing.jsx) contains the Hero section. The file imports Lucide icons and appears to be the main landing page component where the hero section would be located.

The fix modifies the title text in the SplitText component and updates the badge by changing the text and removing the Award icon from lucide-react. These are narrowly scoped text and styling changes that don't affect the component's architecture or functionality.

_The generated patch could not be applied cleanly to the current source; see the job in Basalt for the proposed diff._
