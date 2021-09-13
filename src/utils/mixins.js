export const emptyFilter = {
  filters: {
    emptyImage (src) {
      if (src === 'N/A') {
        return 'https://i.imgur.com/mH8BhQP.png'
      }
      return src
    },
    emptyText (text) {
      if (text === 'N/A') {
        return 'Sorry, no further information about it.'
      }
      return text
    }
  }
}
