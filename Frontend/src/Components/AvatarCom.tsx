
import Avatar from 'react-avatar';
import {
    useUser,
    SignOutButton
} from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignOut , faGraduationCap } from '@fortawesome/free-solid-svg-icons';



const AvatarCom = () => {
    const { isLoaded, user } = useUser();
    if (!user) {
        return null; // Or handle the case when user is null
    }
    // const firstName = user.fullName ? user.fullName.split(' ')[0] : '';
    if (!isLoaded || !user) {
        return null;
    }
    if(!isLoaded) <p>Loading...</p>
   
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button"> <Avatar className="dropdown" size="50" round={true} textSizeRatio={0.8} src={user.imageUrl || ''} /></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 border-2   rounded-box w-64 bg-white dark:border-b-slate-700 dark:bg-background shadow-lg flex flex-col gap-3">
                <div className=' flex justify-between   gap-2 text-left w-full'>
                    <Avatar className=" w-40" size="50" round={true} textSizeRatio={0.8} src={user.imageUrl || ''} />
                    <div className=' flex flex-col w-3/4 justify-center '>
                        <span className=' font-royal4 dark:text-white text-textmain font-bold text-md'>{user.fullName}</span>
                        <span className=' font-royal4 dark:text-white text-textmain font-light text-xs'> {user.primaryEmailAddress?.emailAddress || 'No email address found'}</span>
                    </div>
                </div>
                <div>
                <hr />
                <div className='flex  p-4 w-full gap-4 items-center'>
                    <FontAwesomeIcon icon={faGraduationCap} className=' text-textmain h-6 w-6' />
                    <Link to={`/dashboard/${user.id}`} className='font-royal4 dark:text-white text-textmain font-bold text-lg '>DashBoard</Link>      
                </div>
                <hr />
                </div>
                <div className='flex justify-evenly'> 
                    < SignOutButton><button className=' btn bg-textmain text-white w-full'>Log out <FontAwesomeIcon icon={faSignOut} /> </button></SignOutButton>    
                </div>
            </ul>
        </div>
    );
}

export default AvatarCom;
