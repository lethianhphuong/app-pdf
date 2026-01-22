import {
    LeftOutlined,
    RightOutlined,
    EditOutlined,
    CommentOutlined,
    PrinterOutlined,
    MoreOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Pagination, Space } from 'antd';
import { useState } from 'react';

interface HeaderPdfProps {
    title?: string;
    subtitle?: string;
    currentPage?: number;
    totalPages?: number;
    onClose?: () => void;
    onPrevPage?: () => void;
    onNextPage?: () => void;
    onEdit?: () => void;
    onComment?: () => void;
    onPrint?: () => void;
}

export default function HeaderPdf({
    title = 'Biên bản ghi lời khai - Nguyễn Văn A',
    subtitle = 'Bút lục số: 105-108 • Cập nhật: 12/10/2023 09:30',
    currentPage = 1,
    totalPages = 4,
    onClose,
    onPrevPage,
    onNextPage,
    onEdit,
    onComment,
    onPrint
}: HeaderPdfProps) {
    return (

        <div className="h-[56px] flex items-center justify-between px-4 py-2 bg-[#f5f5f5] border-b border-gray-300" style={{ borderBottom: '1px solid #d9d9d9' }}>
            {/* Left Section - Document Info */}
            <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-[#d8a899] rounded flex items-center justify-center'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='#8b4513' strokeWidth='2'>
                        <path d='M9 12h6M9 16h6M9 8h6M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' />
                    </svg>
                </div>
                <div>
                    <div className='font-semibold text-sm text-gray-900'>{title}</div>
                    <div className='text-xs text-gray-600'>{subtitle}</div>
                </div>
            </div>

            <div className='flex justify-between items-center w-[450px]'>
                <div className='flex items-center gap-2'>
                    <Pagination simple current={currentPage} total={totalPages * 10} />
                </div>

                <Space size='middle'>
                    <Button
                        type='text'
                        icon={<FontAwesomeIcon
                            icon={['fas', 'pen-to-square']}
                        />}
                        size='large'
                        className='bg-[#f9e79f] hover:bg-[#f7dc6f] shadow-md'
                        onClick={onEdit}
                    />
                    <Button
                        type='text'
                        icon={<CommentOutlined />}
                        size='large'
                        className='shadow-md bg-[#aed6f1]'
                        onClick={onComment}
                    />
                    <Button
                        type='text'
                        icon={<PrinterOutlined />}
                        size='large'
                        className='shadow-md bg-[#aed6f1]'
                        onClick={onPrint}
                    />
                    <Button
                        type='text'
                        className='shadow-md'
                        icon={<MoreOutlined />}
                        size='large'
                    />
                </Space>
            </div>
        </div>
    );
}