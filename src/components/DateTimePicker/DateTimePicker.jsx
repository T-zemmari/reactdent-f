import React, {useState, useEffect} from "react";
import CTAButton from "../CTAButton/CTAButton";

const lefticon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" stroke="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
  </svg>
);

const righticon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" stroke="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

const DateTimePicker = (props) => {

    const [page, setPage] = useState(0);
    const [nitems, setNitems] = useState(5);

    const loc = props.locale || 'es';
    const npages = (~~(props.dates.length / nitems));
    const dates = [];
    const times = [];
    for (let i=page*nitems; i<(page+1)*nitems ; i++) {
        if (!props.dates[i]) break;
        dates.push(
            <div key={`date${i}`} className='date'>
                <div className="datemonth">
                    {new Date(props.dates[i][0]).toLocaleDateString(loc, {month: 'numeric', day: 'numeric'})}
                </div>
                <div className="dateweek">
                    {new Date(props.dates[i][0]).toLocaleDateString(loc, {weekday: 'long'})}
                </div>
            </div>
        );
        let j=0;
        times.push(
            <div key={`times${i}`} className='times'>
                {props.dates[i].map((time)=>{
                    j++;
                    return(
                        <CTAButton key={`times${i}${j}`} text={new Date(time).toLocaleTimeString(loc, {hour:'numeric', minute:'numeric'})} styling='time' onClick={()=>{props.handler(time)}}></CTAButton>
                    );
                })}
            </div>
        )
    }

    const handleResize = () => {
        if (window.innerWidth < 400) {
            setNitems(2);
        } else if (window.innerWidth < 575) {
            setNitems(3);
        } else {
            setNitems(5);
        } 
    }

    useEffect(()=>{
        setPage(0);
    },[nitems])

    useEffect(()=>{
        handleResize();
        window.addEventListener('resize', handleResize);
    },[])

  return (
    <div id="dateTimePicker" className="dateTimePicker">
        <div className="dateContainer">
            <div className={page>0?'icon':'icon disabled'} onClick={()=>setPage(page-1>=0?page-1:page)}>{lefticon}</div>
            {dates}
            <div className={page+1<npages?'icon':'icon disabled'} onClick={()=>setPage(page+1<npages?page+1:page)}>{righticon}</div>
        </div>
        <div className="separator"></div>
        <div className="timeContainer">
            <div className="icon"></div>
            {times}
            <div className="icon"></div>
        </div>
    </div>
  );
};

export default DateTimePicker;
