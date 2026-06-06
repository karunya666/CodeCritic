import { useState, useRef, useEffect } from 'react'
import { useUser, useClerk } from '@clerk/clerk-react'

export default function ProfileMenu() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [open, setOpen] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      {/* Avatar button */}
      <button
  onClick={() => setOpen(!open)}
  className="w-8 h-8 rounded-full overflow-hidden transition-all duration-150 flex items-center justify-center"
  style={{
    border: open ? '2px solid #5E5CE6' : '2px solid rgba(255,255,255,0.2)',
    padding: '2px',
    background: '#000',
    borderRadius: '50%',
  }}
>
  {user?.imageUrl ? (
    <img
      src={user.imageUrl}
      alt="avatar"
      className="w-full h-full object-cover"
      style={{ borderRadius: '50%' }}
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-xs font-medium"
      style={{ background: '#5E5CE6', color: '#fff', borderRadius: '50%' }}
    >
      {user?.firstName?.[0] || 'U'}
    </div>
  )}
</button>

      {/* Dropdown */}
      {open && !showEditProfile && (
        <div className="absolute right-0 top-10 w-64 rounded-xl overflow-hidden z-50"
          style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* User info */}
          <div className="px-4 py-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#8A8A8E' }}>
                  {user?.emailAddresses?.[0]?.emailAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <button
              onClick={() => setShowEditProfile(true)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150"
              style={{ color: '#e5e5e5' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Edit Profile
            </button>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '4px 0' }} />

            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150"
              style={{ color: '#8A8A8E' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Log out
            </button>

            <button
              onClick={() => user?.delete()}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150"
              style={{ color: '#FF453A' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,69,58,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile Panel */}
      {open && showEditProfile && (
        <EditProfilePanel
          user={user}
          onBack={() => setShowEditProfile(false)}
          onClose={() => { setOpen(false); setShowEditProfile(false) }}
        />
      )}
    </div>
  )
}

function EditProfilePanel({ user, onBack, onClose }) {
  const { user: clerkUser } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      await clerkUser.update({ firstName, lastName })
      setMessage('Profile updated!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      await clerkUser.setProfileImage({ file })
      setMessage('Avatar updated!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('Failed to update avatar')
    }
  }

  const handleChangePassword = async () => {
    setSaving(true)
    try {
      await clerkUser.updatePassword({
        currentPassword,
        newPassword,
      })
      setMessage('Password updated!')
      setChangingPassword(false)
      setCurrentPassword('')
      setNewPassword('')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err.errors?.[0]?.message || 'Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    background: '#000',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
  }

  return (
    <div className="absolute right-0 top-10 w-72 rounded-xl overflow-hidden z-50"
      style={{
        background: '#111',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <button
          onClick={onBack}
          className="text-xs transition-colors"
          style={{ color: '#8A8A8E' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#8A8A8E'}
        >
          ←
        </button>
        <span className="text-sm font-medium text-white">Edit Profile</span>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden"
            style={{ border: '2px solid rgba(255,255,255,0.1)' }}
          >
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: '#5E5CE6', color: '#fff', fontSize: '18px' }}
              >
                {user?.firstName?.[0] || 'U'}
              </div>
            )}
          </div>
          <label className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs cursor-pointer transition-all duration-150"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#8A8A8E',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#8A8A8E'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload photo
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        {/* Name fields */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs block mb-1" style={{ color: '#8A8A8E' }}>First name</label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full px-3 py-2 rounded text-xs outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.border = '1px solid rgba(94,92,230,0.6)'}
              onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs block mb-1" style={{ color: '#8A8A8E' }}>Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full px-3 py-2 rounded text-xs outline-none"
              style={inputStyle}
              onFocus={e => e.target.style.border = '1px solid rgba(94,92,230,0.6)'}
              onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
            />
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="w-full py-2 rounded text-xs font-medium text-white transition-all duration-150"
          style={{ background: saving ? '#333' : '#5E5CE6' }}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>

        {/* Change password */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
          <button
            onClick={() => setChangingPassword(!changingPassword)}
            className="text-xs transition-colors"
            style={{ color: '#8A8A8E' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#8A8A8E'}
          >
            {changingPassword ? '− Cancel' : '+ Change password'}
          </button>

          {changingPassword && (
            <div className="flex flex-col gap-2 mt-3">
              <input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full px-3 py-2 rounded text-xs outline-none"
                style={inputStyle}
                onFocus={e => e.target.style.border = '1px solid rgba(94,92,230,0.6)'}
                onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
              />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-3 py-2 rounded text-xs outline-none"
                style={inputStyle}
                onFocus={e => e.target.style.border = '1px solid rgba(94,92,230,0.6)'}
                onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
              />
              <button
                onClick={handleChangePassword}
                disabled={saving}
                className="w-full py-2 rounded text-xs font-medium text-white transition-all duration-150"
                style={{ background: saving ? '#333' : '#5E5CE6' }}
              >
                {saving ? 'Updating...' : 'Update password'}
              </button>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <p className="text-xs text-center"
            style={{ color: message.includes('Failed') ? '#FF453A' : '#32D74B' }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}