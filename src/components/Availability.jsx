import { availability } from '../data/site.js'

// Single source of truth for the hiring status, so hero and contact can never
// drift apart. Flip `availability.open` in data/site.js to switch states.
export default function Availability({ className }) {
  const { open, label, closedLabel, detail, closedDetail } = availability
  const detailText = open ? detail : closedDetail

  return (
    <div className={'availability-wrap' + (className ? ' ' + className : '')}>
      <p className={'availability' + (open ? '' : ' availability--closed')}>
        <span className="availability-dot" aria-hidden="true" />
        {open ? label : closedLabel}
      </p>
      {detailText && <p className="availability-detail">{detailText}</p>}
    </div>
  )
}
