import { Input, Segmented, Badge, Tree, Space, Button, Flex, Tooltip } from 'antd';
import { SearchOutlined, FilterOutlined, UserOutlined, CalendarOutlined, StarOutlined, FileTextOutlined, FolderOutlined, UnorderedListOutlined, MehOutlined, DownOutlined } from '@ant-design/icons';
import type { TreeDataNode } from 'antd';
import './SiderBarPdf_Left.css';
import { useState } from 'react';

export default function SiderBarPdf_Left() {
    const [selectedTab, setSelectedTab] = useState<string>('1');
    const treeData: TreeDataNode[] = [
        {
            title: (
                <div className="flex items-center justify-between w-full pr-2">
                    <span className="font-medium">Tháng 10/2023</span>
                    <Badge count={5} style={{ backgroundColor: '#52c41a' }} />
                </div>
            ),
            key: '0-0',
            icon: <FolderOutlined className="text-blue-500" />,
            selectable: false,
            children: [
                {
                    title: (
                        <div>
                            <div className="font-medium">Biên bản ghi lời khai</div>
                            <div className="text-xs text-gray-400">12/10/2023 • Bt. số 105-108</div>
                        </div>
                    ),
                    key: '0-0-',
                    icon: <FileTextOutlined className="text-blue-500" />,
                },
                {
                    title: (
                        <div>
                            <div className="font-medium">Ảnh hiện trường (Phòng khách)</div>
                            <div className="text-xs text-gray-400">12/10/2023 • Bt. số 100</div>
                        </div>
                    ),
                    key: '0-0-10',
                    icon: <FileTextOutlined className="text-blue-500" />,
                },
                {
                    title: (
                        <div className='w-full overflow-hidden'>
                            <Tooltip title="Báo cáo kết quả giám địnhBáo cáo kết quả giám địnhBáo cáo kết quả giám định" placement="topLeft">
                                <div className="font-medium truncate">Báo cáo kết quả giám địnhBáo cáo kết quả giám địnhBáo cáo kết quả giám định</div>
                            </Tooltip>
                            <div className="text-xs text-gray-400">12/10/2023 • Bt. số 112-115</div>
                        </div>
                    ),
                    key: '0-0-12',
                    icon: <FileTextOutlined className="text-blue-500" />,
                }
            ],
        },
        {
            title: (
                <div className="flex items-center justify-between w-full pr-2">
                    <span className="font-medium">Tháng 09/2023</span>
                    <Badge count={12} style={{ backgroundColor: '#52c41a' }} />
                </div>
            ),
            key: '0-1',
            icon: <FolderOutlined className="text-blue-500" />,
            selectable: false,
            children: [
                {
                    title: (
                        <div>
                            <div className="font-medium">Văn bản mẫu</div>
                            <div className="text-xs text-gray-400">15/09/2023 • Bt. số 85-90</div>
                        </div>
                    ),
                    key: '0-1-0',
                    icon: <FileTextOutlined className="text-blue-500" />,
                },
            ],
        },
    ];

    return (
        <div className='flex w-full h-full flex-col transition-all duration-300 bg-white shadow-xl' style={{ borderRight: '1px solid #d9d9d9' }}>
            {/* Search Bar */}
            <div className="p-3 border-b">
                <Input
                    placeholder="Tìm kiếm bút lục, văn bản..."
                    prefix={<SearchOutlined />}
                    suffix={<FilterOutlined />}
                />
            </div>

            <div className="flex gap-2 p-3 border-b overflow-x-auto whitespace-nowrap button-scroll-container">
                <Button type="primary" icon={<UnorderedListOutlined />}>
                    Sổ bút lục
                </Button>
                <Button icon={<UserOutlined />}>
                    Người liên quan
                </Button>
                <Button icon={<CalendarOutlined />}>
                    Ngày tháng
                </Button>
            </div>

            {/* Segmented */}
            <div className="p-3 border-b">
                <Segmented
                    value={selectedTab}
                    onChange={(value) => setSelectedTab(value as string)}
                    options={[
                        { label: 'Theo ngày', value: '1' },
                        { label: 'Theo người', value: '2' },
                    ]}
                    block
                />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
                {selectedTab === '1' && (
                    <div className="flex w-full px-2 h-full flex-col gap-4 overflow-y-auto">
                        {/* ĐÃ ĐÁNH DẤU */}
                        <div className='w-full'>
                            <div className="text-xs font-semibold text-gray-500 mb-2">ĐÃ ĐÁNH DẤU</div>
                            <div className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                                <StarOutlined className="text-orange-500" />
                                <div>
                                    <div className="font-medium">Các trang số 12/CT-VKS</div>
                                    <div className="text-xs text-gray-500">13/09/2023 • Viện Kiểm Sát</div>
                                </div>
                            </div>
                        </div>

                        {/* TREE */}
                        <div className='w-full flex-1'>
                            <Tree
                                showLine
                                showIcon
                                switcherIcon={<DownOutlined />}
                                defaultExpandedKeys={['0-0']}
                                treeData={treeData}
                                className="custom-tree w-full"
                            />
                            <div className='w-full flex-1'>
                                <div className="text-xs font-semibold text-gray-500 mb-2">TRUY CẬP NHANH</div>
                            </div>
                        </div>
                    </div>
                )}
                {selectedTab === '2' && (
                    <div className="p-4">Nội dung theo người</div>
                )}
            </div>
        </div>
    );
}