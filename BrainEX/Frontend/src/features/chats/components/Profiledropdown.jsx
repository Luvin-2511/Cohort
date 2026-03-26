import { Ic } from "./Icons";
import { PROFILE_MENU } from "./Constants";

export default function ProfileDropdown({ pRect, user, onClose, onLogout }) {
  if (!pRect) return null;

  return (
    <div
      data-prof
      data-dd
      className="profile-dd"
      style={{
        bottom: window.innerHeight - pRect.top + 8,
        left: pRect.left,
      }}
    >
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          S
        </div>
        <div>
          <div className="profile-name">
            {user.username}
          </div>
          <div className="profile-plan-badge">
            Free plan
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {PROFILE_MENU.map((it, i) =>
        it === null ? (
          <div
            key={i}
            className="profile-dd-divider"
          />
        ) : (
          <button
            key={i}
            className={`dd-item profile-dd-item${it.danger ? ' danger' : ''}`}
            onClick={() => {
              if (it.label === "Log out") onLogout();
              onClose();
            }}
          >
            <Ic d={it.icon} size={13} sw={1.8} />
            {it.label}
          </button>
        ),
      )}
    </div>
  );
}