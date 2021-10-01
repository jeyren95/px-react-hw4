import { StarIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";
import { Button } from "components/button";
import { useDeleteComment } from "domains/movies";


export const Comment = ({ rating, content, userName, commentId, userId }) => {
    const { associatedUser, attemptDeleteComment } = useDeleteComment()

    const renderRating = () => {
        let stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-300 inline-block" />)
            } else {
                stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-200 inline-block" />)
            }
            
        }   
        return stars
    }


    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md mb-3">
            <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="text-sm leading-5 font-medium text-pink-600 truncate"> 
                            <span>{userName}</span>
                        </div>
                        <div className="mt-2 flex">
                            {renderRating()}
                        </div>
                        <div className="mt-2 flex">
                            <div className="flex items-center gap-2 text-sm leading-5 text-gray-700">
                                <span>{content}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {associatedUser === userId &&
                    <div className="ml-5 flex-shrink-0 inline-flex items-center justify-center gap-2">
                        <Button 
                        type="button"
                        onClick={() => attemptDeleteComment(commentId)}
                         >
                            <TrashIcon 
                            className="h-6 w-6 text-white" 
                            />
                        </Button>
                      
                        
                    </div>
                }
            </div>
        </div>
    )
}