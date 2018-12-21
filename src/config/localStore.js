export default {
  /**
   * 储存localStorage
   */
  setStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  /**
   * 获取localStorage
   */
  getStorage (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  /**
   * 删除localStorage
   */
  removeStorage (name) {
    if (!name) return
    return window.localStorage.removeItem(name)
  }
}
