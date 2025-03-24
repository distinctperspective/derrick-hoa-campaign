'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/new-york-v4/ui/table";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { format } from 'date-fns';

interface Request {
    id: string;
    title: string;
    description: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
    createdAt: string;
    userName: string;
    replies?: Array<{
        id: string;
        content: string;
        createdAt: string;
        userName: string;
    }>;
}

interface RequestsTableProps {
    requests: Request[];
}

export default function RequestsTable({ requests }: RequestsTableProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'IN_PROGRESS':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'RESOLVED':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="rounded-lg bg-white shadow-lg px-5">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-gray-100">
                        <TableHead className="text-[#0B3558]">Title</TableHead>
                        <TableHead className="text-[#0B3558]">Status</TableHead>
                        <TableHead className="text-[#0B3558]">Date</TableHead>
                        <TableHead className="text-[#0B3558]">Replies</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request) => (
                        <TableRow key={request.id} className="cursor-pointer hover:bg-gray-50 border-b border-gray-100">
                            <TableCell className="font-medium text-[#0B3558]">{request.title}</TableCell>
                            <TableCell>
                                <Badge className={getStatusColor(request.status)}>
                                    {request.status.replace('_', ' ')}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">{format(new Date(request.createdAt), 'MMM d, yyyy')}</TableCell>
                            <TableCell className="text-gray-600">{request.replies?.length || 0}</TableCell>
                        </TableRow>
                    ))}
                    {requests.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 py-8">
                                No requests found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
