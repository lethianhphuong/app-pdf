import { Avatar, Button, Card } from "antd";

interface CardSiderBarPdfProps {
    note: {
        id: number;
        author?: string;
        time?: string;
        title?: string;
        content?: string;
    },
    handleDelete: (id: number) => void;
}
export default function CardSiderBarPdf({ note, handleDelete }: CardSiderBarPdfProps) {

    return (
        <Card key={note.id} size='small' className='shadow-sm bg-[#ecebeb]'>
            <div className='flex justify-between items-center mb-2'>
                <Avatar size={30} style={{ backgroundColor: '#558fd6ff' }}>TK</Avatar>
                <div className='flex-1 ml-2'>
                    <div className='font-semibold text-sm text-gray-800'>{note.author}</div>
                </div>
                <div className='text-xs text-gray-500'>{note.time}</div>
            </div>

            {note.title && (
                <div className='text-xs text-gray-600 italic mb-1 border-l-2 border-yellow-400 pl-2'>
                    "{note.title}"
                </div>
            )}

            <div className='text-sm text-gray-700 mb-3'>{note.content}</div>

            <div className='flex justify-end gap-2'>
                <Button size='small' type='text' className='text-blue-600'>
                    Sửa
                </Button>
                <Button
                    size='small'
                    type='text'
                    danger
                    onClick={() => handleDelete(note.id)}
                >
                    Xóa
                </Button>
            </div>
        </Card>
    )
}