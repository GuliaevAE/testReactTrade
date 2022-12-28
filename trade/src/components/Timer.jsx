import React from 'react';
import { BsHourglassSplit } from 'react-icons/bs';

const Timer = (props) => {
    return (
        <div className='relative bg-[#e1b0b0] w-full rounded  p-[5px_10px] text-[#952828] text-center'>
            <span className=''>{props.time}</span>
            <BsHourglassSplit className='absolute right-[5px] top-[50%] translate-y-[-50%] '/>
        </div>
    );
};

export default Timer;