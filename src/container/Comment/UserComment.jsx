import React from 'react';
import { Avatar } from 'flowbite-react';

const UserComment = ({data, commentData}) => {

  return (
    <>
        {commentData.map((item, index) => {
            if(item.menuid === data._id){
                return(
                    <div key={index}>
                        <br/>
                        <div>
                            <Avatar img={item.avatar} rounded={true}>
                                <div className="space-y-1 font-medium dark:text-white">
                                    <div>
                                        {item.name}
                                        <div className='text-sm text-gray-500 dark:text-gray-400 break-all'>
                                            {item.comment}
                                        </div>
                                    </div>
                                </div>
                            </Avatar>
                        </div>
                    </div>
                );
            }
        })}
    </>
  );
};

export default UserComment;
