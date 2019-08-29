// flow-typed signature: ca55ef5638d3115584732654b14dd216
// flow-typed version: c6154227d1/redux-act_v1.x.x/flow_>=v0.104.x

type Reducer$On<S> = (
  actionCreator: mixed,
  reduceFunction: (S) => mixed
) => mixed;
type Reducer$Off = (actionCreator: mixed) => mixed;
type Reducer$OnOff<S> = (on: Reducer$On<S>, off: Reducer$Off) => void;

declare module "redux-act" {
  declare module.exports: {
    createReducer<ReducerState>(
      handlers:
        | {| [key: string]: (ReducerState, payload: mixed) => ReducerState |}
        | Reducer$OnOff<ReducerState>,
      defaultState?: ReducerState
    ): {
      (): (state: ReducerState, payload?: mixed, meta?: mixed) => ReducerState,
      options: () => mixed,
      has: (actionCreator: mixed) => boolean,
      on: Reducer$On<ReducerState>,
      off: Reducer$Off,
      assignAll: ({...} | Array<mixed>, {...} | Array<mixed>) => mixed,
      bindAll: ({...} | Array<mixed>, {...} | Array<mixed>) => mixed,
      batch: ({...} | Array<mixed>) => mixed,
      disbatch: (mixed, void | Array<mixed>) => mixed,
      ...
    },
    createAction<ActionArgs, ReducerPayload, ReducerMetadata>(
      description: string,
      payloadReducer?: (...ActionArgs) => ReducerPayload,
      metaReducer?: (...ActionArgs) => ReducerMetadata
    ): {
      (
        ...ActionArgs
      ): {
        type: string,
        payload: ReducerPayload,
        meta?: ReducerMetadata,
        ...
      },
      toString: () => string,
      getType: () => string,
      assignTo: mixed => void,
      bindTo: mixed => mixed,
      assigned: () => boolean,
      bound: () => boolean,
      dispatched: () => boolean,
      raw: () => mixed,
      ...
    },
    // TODO: Document properties & add tests
    types: {
      add: string => void,
      remove: string => void,
      has: string => boolean,
      all: () => Array<string>,
      clear: () => void,
      ...
    },
    ...
  };
}
