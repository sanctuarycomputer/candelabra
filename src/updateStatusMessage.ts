import { Url } from 'types';

export default (url: Url, entryUrl: Url, queue: Url[]): void => {
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  if (url !== entryUrl) process.stdout.moveCursor(0, -2);

  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.cursorTo(0);
  // @ts-ignore - see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31505
  process.stdout.clearScreenDown();
  process.stdout.write(
    `${'[AUDITING]'.bgYellow.black.bold} ${url.white}`.underline + '\n\n'
  );
  process.stdout.write(
    `${
      `${flattenSitemapViolations().length}`.red.bold
    } violations found so far. ${
      `There are ${`${queue.length}`.bold} remaining pages in the queue.`.gray
    }`
  );
};
