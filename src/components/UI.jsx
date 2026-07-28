import { Check, ExternalLink, Layers3 } from 'lucide-react'

export function Logo() { return <span className="logo"><span className="stackmark" aria-hidden="true"><i/><i/><i/></span><b>podstack</b></span> }
export function Tags({ items }) { return <div className="tags">{items.map(x => <span key={x}><Check size={12}/>{x}</span>)}</div> }
export function ListenLink({ item, service, compact = false }) {
  const known = service !== 'Other' && item.links?.[service]
  const href = known || item.links?.general || '#'
  return <a className={`primary ${compact ? 'compact' : ''}`} href={href} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} in ${known ? service : 'your podcast app'}`}>
    {known ? `Open in ${service}` : 'Open episode'} <ExternalLink size={16}/>
  </a>
}
export function Artwork({ item }) { return <div className="art" aria-label={`${item.show} artwork`}><span>{item.art}</span><small>{item.show}</small></div> }
export function LoadingStack() { return <div className="loading-stack" aria-hidden="true"><i/><i/><i/><Layers3/></div> }
