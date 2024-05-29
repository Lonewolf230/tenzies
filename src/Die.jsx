import './die.css'


export default function Die(props){

    

    return(
        <>
            <div className={props.selected? 'die selected':'die'} onClick={()=>props.mark(props.id)}>
                {props.value}</div>
        </>
    )
}