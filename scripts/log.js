import chalk from "chalk";

export const log = (text, status = 'default') => {
  const colorMap = {
    'default': 'cyan',
    'error': 'red',
    'warning': 'yellow'
  }

  console.log((chalk[ colorMap[status] ])('> ' + text))
}

