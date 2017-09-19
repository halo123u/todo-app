export function taskHasErrored(bool) {
   return {
       type : 'ITEM_HAS_ERRORED',
       hasErrored: bool
   } 
}

export function itemIsLoading(bool) {
    return {
        type : 'ITEM_IS_LOADING',
        isLoading: bool
    } 
 }

 export function itemsFetchDataSuccess(items) {
    return {
        type : 'ITEM_FETCH_PATCH_SUCCESS',
        items
    }; 
 }