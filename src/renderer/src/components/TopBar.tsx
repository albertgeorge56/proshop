import WindowButton from './WindowButton'

const TopBar = () => {
  return (
    <div className="fixed top-0 w-full">
      <div className="px-3 py-2 flex justify-between items-center draggable">
        <div className="flex gap-1 items-center no-drag">
          <img src="./icon.png" className="w-7 h-7" alt="" />{' '}
          <span className="font-bold text-md text-primary-900 text-sm">PROSHOP</span>
        </div>
        <div className="no-drag">
          <WindowButton />
        </div>
      </div>
    </div>
  )
}
export default TopBar
