import chalk from "chalk";

export const logger = {
  info(msg) {
    console.log(chalk.cyan("nnuikit:"), msg);
  },
  success(msg) {
    console.log(chalk.green("✓"), msg);
  },
  warn(msg) {
    console.log(chalk.yellow("⚠"), msg);
  },
  error(msg) {
    console.log(chalk.red("✗"), msg);
  },
  break() {
    console.log("");
  },
};
