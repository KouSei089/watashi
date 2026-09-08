import { timeline, FIRST_YEAR, LAST_YEAR } from './timeline';
import { eyecatchData } from './eyecatchData';

const diaryYears = eyecatchData.map((d) => d.created_at.slice(0, 4)).sort();

/**
 * サイトの章。ナビのタブ、冒頭の目次、ページのルーティングが
 * すべてこの 1 つの定義を見る。
 */
export const sections = [
  {
    index: '01',
    path: '/watashi/about',
    label: 'About',
    name: 'わたし',
    meta: '島根県隠岐諸島 海士町',
  },
  {
    index: '02',
    path: '/watashi/history',
    label: 'History',
    name: 'これまでのわたし',
    meta: `${timeline.length} events · ${FIRST_YEAR}—${LAST_YEAR}`,
  },
  {
    index: '03',
    path: '/watashi/diary',
    label: 'Diary',
    name: '読書の日記',
    meta: `${eyecatchData.length} entries · ${diaryYears[0]}—${diaryYears[diaryYears.length - 1]}`,
  },
] as const;

export const HOME_PATH = '/watashi';
export const CONTACT_PATH = '/watashi/contact';
