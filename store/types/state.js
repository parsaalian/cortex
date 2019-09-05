// @flow
import type { StyleType } from './editor';

export type StateType = {
  ...StyleType,
  +document: {
    +cursor: Array<number>,
    +pages: Array<{
      +lineGroups: Array<{
        +type: string,
        +level: number,
        +spaces: number,
        +wordGroups:
          | Array<{
              +type: string,
              +characters: string,
              +style?: Array<{
                +from: number,
                +style: string,
              }>,
            }>
          | Array<{
              +type: string,
              +pointer: number,
              +lines: Array<number>,
            }>,
        +size: Array<number>,
      }>,
      +footnotes: Array<number>,
      +size: number,
    }>,
    +headings: Array<{
      +type: string,
      +level: number,
      +wordGroups: Array<{
        +type: string,
        +characters: Array<{
          +content: string,
          +style: string,
        }>,
      }>,
      +size: Array<number>,
    }>,
    +footnotes: Array<{
      +wordGroups: Array<{
        +type: string,
        +characters: Array<{
          +content: string,
          +style: string,
        }>,
      }>,
      +size: Array<number>,
    }>,
    +images: Array<string>,
    +tables: Array<{
      +head: Array<string>,
      +body: Array<Array<string>>,
    }>,
  },
};
