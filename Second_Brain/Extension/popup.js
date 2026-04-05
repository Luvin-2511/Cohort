document.addEventListener('DOMContentLoaded', function () {
  const saveBtn = document.getElementById('saveBtn')
  const statusDiv = document.getElementById('status')
  const API = "http://localhost:3000/api"

  saveBtn.addEventListener('click', async () => {
    saveBtn.disabled = true
    saveBtn.textContent = 'Saving...'

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      
      const { token } = await chrome.storage.local.get('token')
      
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      const res = await fetch(`${API}/item/save-item`, {
        method: 'POST',
        headers: headers,
        credentials: 'include',
        body: JSON.stringify({ url: tab.url })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        saveBtn.style.display = 'none'
        statusDiv.style.color = 'green'
        statusDiv.textContent = 'Saved!'
        statusDiv.style.display = 'block'
      } else {
        throw new Error(data.message || 'Something went wrong')
      }

    } catch (err) {
      console.error(err)
      statusDiv.style.color = 'red'
      statusDiv.textContent = err.message || 'Something went wrong'
      statusDiv.style.display = 'block'
      saveBtn.disabled = false
      saveBtn.textContent = 'Save to Memex'
    }
  })
})