
const Message = () => {
  return (
      <div className={`chat chat-end`}>
          {/* <div className={`chat ${chatClassName}`}> */}
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPfO37MK81JIyR1ptwqr_vYO3w4VR-iC2wqQ&usqp=CAU"}/>
				</div>
			</div>
			<div className={`chat-bubble text-white  pb-2`}>HIII</div>
			{/* <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div> */}
			{/* <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div> */}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'></div>
		</div>
  )
}

export default Message;