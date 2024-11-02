
const InputTab = ({title ,placeholder, onChange}) => {
  return (
    <div className="py-1">
        <label className='text-sm font-medium text-left py-10'>{title}</label>
        <input onChange={onChange} type='text' placeholder= {placeholder} className="w-full px-2 py-2 border rounded border-slate-200"/>
    </div>
  )
}

export default InputTab