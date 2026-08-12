# Contributing to G sa Marikina

## Git Flow

We follow a simplified Git Flow. The rules are strict — do not commit directly to `main` or `develop`.

```
main          ← production only. Never commit here directly.
develop       ← integration branch. All features merge here first.
feature/*     ← new features, branched from develop
fix/*         ← bug fixes, branched from develop
hotfix/*      ← urgent production fixes, branched from main
release/*     ← release candidates, branched from develop → merges into main + develop
```

---

## Branch naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/short-description` | `feature/listing-search` |
| Bug fix | `fix/short-description` | `fix/map-pins-invisible` |
| Hotfix | `hotfix/short-description` | `hotfix/nav-broken-mobile` |
| Release | `release/v1.x.x` | `release/v1.2.0` |
| Design | `design/short-description` | `design/footer-redesign` |

---

## Workflow

### Starting a new feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

### Finishing a feature

```bash
# on your feature branch
git push -u origin feature/your-feature-name
# then open a PR → develop on GitHub
```

### Releasing to production

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.x.x

# do final testing, bump version if needed
git checkout main
git merge release/v1.x.x --no-ff
git tag -a v1.x.x -m "Release v1.x.x"
git push origin main --tags

# merge back into develop too
git checkout develop
git merge release/v1.x.x --no-ff
git push origin develop
```

### Hotfix (urgent production bug)

```bash
git checkout main
git pull origin main
git checkout -b hotfix/what-is-broken

# fix the bug
git checkout main
git merge hotfix/what-is-broken --no-ff
git push origin main

# merge back into develop
git checkout develop
git merge hotfix/what-is-broken --no-ff
git push origin develop
```

---

## Commit message format

```
type(scope): short description

types: feat | fix | style | refactor | docs | chore | test
```

Examples:
```
feat(search): filter by barangay using URL params
fix(map): pins invisible due to stale CSS vars
style(footer): make G! logo larger with red text
docs: add Git Flow contributing guide
chore: add all 16 Marikina barangays to constants
```

---

## Rules

- **Never push directly to `main`** — open a PR from `release/*` or `hotfix/*` only
- **Never push directly to `develop`** — open a PR from `feature/*` or `fix/*`
- **Always pull latest develop** before branching
- **One branch per feature** — keep branches focused and short-lived
- **Delete branches after merging**

---

## Current branch state

| Branch | Purpose | Status |
|--------|---------|--------|
| `main` | Production | Protected |
| `develop` | Integration | Active |
| `redesign/resy-dark-editorial` | Redesign (merged) | Can be deleted |
| `design/ui-overhaul` | Old attempt (abandoned) | Can be deleted |
