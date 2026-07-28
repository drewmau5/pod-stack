import { useEffect,useState } from 'react'
import { defaultState } from '../data/mockData'
const KEY='podstack.prototype.v3'
export function usePrototype(){
 const [state,setState]=useState(()=>{try{return {...defaultState,...JSON.parse(localStorage.getItem(KEY))}}catch{return defaultState}})
 useEffect(()=>localStorage.setItem(KEY,JSON.stringify(state)),[state])
 const patch=value=>setState(current=>({...current,...value}))
 const updateStatus=(slotId,status)=>setState(current=>({...current,stack:current.stack.map(x=>x.slotId===slotId?{...x,status}:x),[status]:[...(current[status]||[]),slotId]}))
 const swap=(slotId,episode)=>setState(current=>{const old=current.stack.find(x=>x.slotId===slotId);if(!old)return current;const next={...episode,slotId,day:old.day,window:old.window,status:'planned'};return {...current,stack:current.stack.map(x=>x.slotId===slotId?next:x),alternates:[old,...current.alternates.filter(x=>x.id!==episode.id)],swaps:[...current.swaps,{slotId,from:old,to:next}]}})
 const undo=()=>setState(current=>{const action=current.swaps.at(-1);if(!action)return current;return {...current,stack:current.stack.map(x=>x.slotId===action.slotId?action.from:x),alternates:current.alternates.filter(x=>x.id!==action.from.id).concat(action.to),swaps:current.swaps.slice(0,-1)}})
 const reset=()=>{localStorage.removeItem(KEY);setState(defaultState)}
 return {state,patch,updateStatus,swap,undo,reset}
}
