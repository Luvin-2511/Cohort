In-browser code editor
Monaco or CodeMirror with syntax highlighting, autocomplete, and multi-language support.
core
Sandboxed Docker containers or Judge0 API to run user code safely with time & memory limits.
core
Test case engine
Hidden + visible test cases, custom input/output, edge case validation per problem.
core
Multi-language support
Python, JS, Java, C++, Go, Rust — let users pick their preferred language per battle.
core
Problem library
Curated problems by difficulty (easy/medium/hard) with tags like arrays, DP, graphs.
Battle system (Socket.io core)
real-time
1v1 matchmaking
Random or ranked matchmaking queue via Socket.io rooms. Players join a shared session room.
real-time
Synced countdown timer
Server-authoritative timer broadcast to both players. No client-side manipulation possible.
real-time
Opponent progress tracker
Emit events when opponent passes test cases — show a live progress bar without exposing their code.
real-time
Result declaration
Server validates and compares submissions. Winner announced instantly to both clients via socket event.
real-time
Group battles (2–8 players)
Multi-player rooms where everyone solves the same problem. Last man standing or first to finish wins.
real-time
Disconnect handling
Grace period on disconnect — auto-forfeit or pause battle. Reconnect support to resume session.
Social & community
social
Spectator mode
Let users watch live battles in read-only mode. Socket.io broadcasts code diffs with a delay.
social
In-battle chat
Real-time chat room per battle session. Optional trash-talk or GG reactions with emoji.
social
Friends & challenges
Send a direct battle invite to a friend by username. Private rooms with custom rules.
social
Replay system
Record and play back battles step-by-step. Useful for learning and sharing epic wins.
social
Post-battle review
See opponent's solution after match ends. Compare approaches, runtime, and memory.
Ranking & gamification
meta
ELO rating system
Classic chess-style ELO or Glicko-2. Rating changes based on opponent strength and result.
meta
Global leaderboard
Weekly, monthly, and all-time rankings. Filter by language, difficulty, or region.
meta
Badges & achievements
Unlockable badges: "10-win streak", "solved in under 1 min", "first blood", etc.
meta
XP & levels
Earn XP per battle, level up to unlock new problem packs or profile customizations.
meta
Win streak tracker
Live streak counter shown on profile. Bonus XP for maintaining a streak.
Practice & learning
core
Solo practice mode
Solve problems without battling. Track personal best times and solution history.
core
AI hint system
Optional hints powered by an LLM. Penalize ELO or disable in ranked mode.
core
Editorial & solutions
Unlock editorials after solving or after a battle. Community-submitted solutions.
core
Daily challenge
One problem per day for all users. Bonus XP for solving before midnight.
Platform & infra
core
Auth & profiles
JWT auth, Google/GitHub OAuth. User profiles with stats, badges, and match history.
real-time
Socket.io + Redis adapter
Use Redis pub/sub adapter to scale Socket.io horizontally across multiple Node servers.
core
Admin panel
Add/edit problems, manage users, view live battle sessions, flag cheaters.
core
Anti-cheat layer
Detect tab-switching, copy-paste from outside, and plagiarism between submissions.
core
Notifications
Real-time in-app and push notifications for battle invites, results, and friend activity.