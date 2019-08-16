// @flow
export type StateType = {
  +format: {
    +direction: string,
    +text: {
      +bold: boolean,
      +italic: boolean,
      +underline: boolean,
      +strikethrough: boolean,
      +script: ?string,
      +case: ?string,
    },
    +paragraph: {
      +style: string,
    },
  },
  +document: {
    +cursor: Array<number>,
    +pages: Array<{
      +lineGroups: Array<{
        +type: string,
        +level: number,
        +wordGroups: Array<{
              +type: string,
              +characters: Array<{
                +content: string,
                +style: string,
              }>,
            }>
          | Array<{
              +type: string,
              +pointer: number,
              +lines: Array<number>,
            }>,
        +size: {
          +width: number,
          +height: number,
        },
      }>,
      +footnotes: Array<number>,
      +size: {
        +width: number,
        +height: number,
      },
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
      +size: {
        +width: number,
        +height: number,
      },
    }>,
    +footnotes: Array<{
      +wordGroups: Array<{
        +type: string,
        +characters: Array<{
          +content: string,
          +style: string,
        }>,
      }>,
      +size: {
        +width: number,
        +height: number,
      },
    }>,
    +images: Array<string>,
    +tables: Array<{
      +head: Array<string>,
      +body: Array<Array<string>>,
    }>,
  },
};