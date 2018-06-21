/**
 * @flow
 * @relayHash 9e8e0375524fc1f0ffa9f6635d8af48f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type HomePage$ref = any;
export type routerQueryVariables = {||};
export type routerQueryResponse = {|
  +$fragmentRefs: HomePage$ref
|};
*/


/*
query routerQuery {
  ...HomePage
}

fragment HomePage on RootQueryType {
  songs {
    id
    title
  }
}
*/

const node/*: ConcreteRequest*/ = {
  "kind": "Request",
  "operationKind": "query",
  "name": "routerQuery",
  "id": null,
  "text": "query routerQuery {\n  ...HomePage\n}\n\nfragment HomePage on RootQueryType {\n  songs {\n    id\n    title\n  }\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "routerQuery",
    "type": "RootQueryType",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "HomePage",
        "args": null
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routerQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "songs",
        "storageKey": null,
        "args": null,
        "concreteType": "SongType",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
};
// prettier-ignore
(node/*: any*/).hash = '783016fc75aea76b96d39e131a5ac4d5';
module.exports = node;
