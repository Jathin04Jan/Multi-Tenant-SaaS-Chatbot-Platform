# Admin UI Smoke Checklist (Manual)

Use this checklist to verify the Admin area mounts independently and does not affect tenant flows.

- Admin routes only under `/admin/*`
  - Navigate to `/admin/overview`, `/admin/tenants`, `/admin/usage`, `/admin/jobs`, `/admin/moderation`, `/admin/plans`, `/admin/audit`, `/admin/settings`.
  - Confirm no Admin pages are reachable without the `/admin/` prefix.

- No changes to tenant pages under `frontend/src/pages/*`
  - Visit `/dashboard/overview`, `/signin`, `/signup`, `/`.
  - Ensure layout, navigation, and behavior are unchanged.

- No network calls in Admin
  - Open DevTools Network tab.
  - Navigate around Admin pages (Overview, Tenants, Usage, Jobs, Moderation, etc.).
  - Expect 0 network requests (data is read from local mocks only).

- Suspicious/destructive actions disabled
  - On Admin pages, hover buttons like "Create Tenant", "Impersonate", "Pause Indexing", "Change Plan", "Retry", "Rotate Secret".
  - Buttons should be disabled and show tooltip "Demo only".

- Build passes
  - From `frontend/`: run `pnpm build` (or `npm run build`, `bun run build`).
  - Expect a successful build with no tenant route changes.

- Tenant routes still work
  - Visit typical tenant routes: `/dashboard/overview`, `/dashboard/agents`, `/dashboard/settings`.
  - Ensure they behave exactly as before.

## Optional: Automated Smoke Test (if tests are configured)

If Jest + React Testing Library are set up, this minimal test renders the Admin router and asserts core text exists.

Create `frontend/src/admin/__tests__/admin-smoke.test.tsx` with:

```ts
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AdminRoutes } from '../routes';

test('renders Admin overview basics', async () => {
  render(
    <MemoryRouter initialEntries={["/overview"]}>
      <Routes>
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </MemoryRouter>
  );

  // Look for common labels present on the Overview page
  expect(await screen.findByText(/Alerts/i)).toBeInTheDocument();
  expect(await screen.findByText(/Quick Actions/i)).toBeInTheDocument();
});
```

Run (if configured):
- `pnpm test` (or your test runner)

Notes:
- This test does not perform any network calls; components read from mock files under `frontend/src/admin/mocks/*`.
- If your project has no test setup, skip this section — the manual checks above are sufficient.

