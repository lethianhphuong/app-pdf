
import { Container } from '@/components/Atoms';
import { BookTwoTone, EditOutlined, DeleteOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card, Input, Space } from 'antd';
import { useState } from 'react';
import CardSiderBarPdf from './Components/CardSiderBarPdf';

interface Note {
    id: number;
    author: string;
    time: string;
    title?: string;
    content: string;
}

export default function SiderBarPdf_Right() {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            author: 'Thẩm phán Trần Hữu',
            time: '12:45 PM',
            title: 'cảm hơ một gói đó nhớ được...',
            content: 'Cần đổi chiều lời khai này với camera an ninh tại quán cafe Góc Phố vào khung giờ 18:30 - 19:30.'
        },
        {
            id: 2,
            author: 'Thư ký Lê Lan',
            time: 'Hôm qua',
            title: 'Ghi chú chung',
            content: 'Đã gửi giấy triệu tập nhân chứng B lần 2.'
        },
        {
            id: 3,
            author: 'Thẩm phán Trần Hữu',
            time: '12:45 PM',
            title: 'cảm hơ một gói đó nhớ được...',
            content: 'Cần đổi chiều lời khai này với camera an ninh tại quán cafe Cần đổi chiều lời khai này với camera an ninh tại quán cafe GCần đổi chiều lời khai này với camera an ninh tại quán cafe GCần đổi chiều lời khai này với camera an ninh tại quán cafe GGóc Phố vào khung giờ 18:30 - 19:30.'
        },
    ]);
    const [newNote, setNewNote] = useState('');

    const handleDelete = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleAddNote = () => {
        if (newNote.trim()) {
            const newNoteObj: Note = {
                id: Date.now(),
                author: 'Người dùng',
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                content: newNote
            };
            setNotes([newNoteObj, ...notes]);
            setNewNote('');
        }
    };

    return (
        <div className='SiderBarPdf flex w-full h-full flex-col transition-all duration-300' style={{ borderLeft: '1px solid #d9d9d9' }}>
            {/* Header */}
            <div className='p-3 flex items-center gap-2' style={{ borderBottom: '1px solid #d9d9d9' }}>
                <FileTextOutlined style={{ fontSize: '20px' }} />
                <h3 className='m-0 flex-1 font-semibold'>Ghi chú & Bút lục</h3>
                <Badge count={notes.length} style={{ backgroundColor: '#52c41a' }} />
            </div>

            {/* Danh sách ghi chú */}
            <div className='flex-1 overflow-y-auto p-3 space-y-3'>
                {notes.map((note) => (
                    <CardSiderBarPdf note={note} handleDelete={handleDelete} />
                ))}
            </div>

            {/* Thêm ghi chú */}
            <div className='p-3' style={{ borderTop: '1px solid #d9d9d9', minHeight: '180px' }}>
                <h3 className='m-0 flex-1 font-semibold'>THÊM GHI CHÚ MỚI</h3>
                <Input.TextArea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder='Nhập nội dung ghi chú...'
                    rows={3}
                    onPressEnter={(e) => {
                        if (e.shiftKey) return;
                        e.preventDefault();
                        handleAddNote();
                    }}
                />
                <Button
                    type='dashed'
                    block
                    className='mt-2'
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                >
                    Thêm ghi chú
                </Button>
            </div>
        </div>
    );
}
