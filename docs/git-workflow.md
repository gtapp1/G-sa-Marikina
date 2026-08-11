# Git Workflow (Git Flow)

This project uses a **Git Flow** branching model.

## Permanent branches

| Branch    | Purpose                                              | Deploys to  |
|-----------|------------------------------------------------------|-------------|
| `main`    | Production-ready code. Every commit is releasable.   | Production  |
| `develop` | Integration branch. Latest delivered dev changes.    | Staging     |

Never commit directly to `main`. It only receives merges from `release/*` and `hotfix/*` branches.

## Supporting branches

| Prefix       | Branches from | Merges into           | Purpose                        |
|--------------|---------------|-----------------------|--------------------------------|
| `feature/*`  | `develop`     | `develop`             | New features and enhancements  |
| `release/*`  | `develop`     | `main` and `develop`  | Prep a production release      |
| `hotfix/*`   | `main`        | `main` and `develop`  | Urgent production fixes        |

## Everyday commands

### Start a feature
```bash
git checkout develop
git pull
git checkout -b feature/my-feature
# ...work, commit...
git push -u origin feature/my-feature
```
Open a pull request into `develop` when ready.

### Finish a feature
Merge the PR into `develop` (squash or merge commit), then delete the feature branch.

### Cut a release
```bash
git checkout develop
git pull
git checkout -b release/1.0.0
# bump version, final fixes, changelog
git push -u origin release/1.0.0
```
When ready, merge `release/1.0.0` into `main`, tag it, then merge back into `develop`:
```bash
git checkout main
git merge --no-ff release/1.0.0
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin main --tags
git checkout develop
git merge --no-ff release/1.0.0
git push origin develop
```

### Hotfix
```bash
git checkout main
git pull
git checkout -b hotfix/1.0.1
# fix, commit
git checkout main
git merge --no-ff hotfix/1.0.1
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git push origin main --tags
git checkout develop
git merge --no-ff hotfix/1.0.1
git push origin develop
```

## Commit message convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add restaurant filtering by cuisine
fix: correct map marker positioning
docs: update setup instructions
chore: bump dependencies
refactor: extract listing card component
```

## Local git config applied

- `init.defaultBranch = main`
- `pull.rebase = false` (merge on pull)
- `push.autoSetupRemote = true` (auto-create upstream on first push)
- `branch.autosetupmerge = always`
