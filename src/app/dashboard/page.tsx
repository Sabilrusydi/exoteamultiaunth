"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, RefreshCcw, Trash2 } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Admin - EXO TEA</h1>

      <Tabs defaultValue="menu">
        <TabsList>
          <TabsTrigger value="menu">Daftar Menu</TabsTrigger>
          <TabsTrigger value="pesanan">Pesanan Masuk</TabsTrigger>
          <TabsTrigger value="laporan">Laporan Penjualan</TabsTrigger>
        </TabsList>

        {/* Tab Menu */}
        <TabsContent value="menu">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Manajemen Menu</h2>
                <Button variant="default">
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Menu
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Matcha Latte</TableCell>
                    <TableCell>Minuman</TableCell>
                    <TableCell>Rp18.000</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Pesanan */}
        <TabsContent value="pesanan">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Pesanan Masuk</h2>
                <Button variant="secondary">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Menu</TableHead>
                    <TableHead>Waktu</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Rina</TableCell>
                    <TableCell>Thai Tea</TableCell>
                    <TableCell>10:32</TableCell>
                    <TableCell>
                      <span className="text-yellow-500">Pending</span>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="default" size="sm">
                        Proses
                      </Button>
                      <Button variant="outline" size="sm">
                        Selesai
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Laporan */}
        <TabsContent value="laporan">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-semibold">Laporan Penjualan</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Total Pesanan</TableHead>
                    <TableHead>Pendapatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2025-05-28</TableCell>
                    <TableCell>23</TableCell>
                    <TableCell>Rp 475.000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
