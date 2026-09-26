<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the supplied Three.js market ornament in a client effect inside the existing home page, not a second route, because it is decorative and the educational content must remain server-rendered.
- Keep haptic feedback as optional browser vibration with visual pressed states, because many iOS and desktop browsers do not support vibration.
- Keep shared site chrome in SiteLayout and detail content on distinct TanStack routes, because the home page should remain short while every section stays directly accessible.
