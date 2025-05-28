"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Laporan = {
  tanggal: string;
  totalPesanan: number;
  pendapatan: number;
};

const laporanHarian: Laporan[] = [
  { tanggal: "2025-05-27", totalPesanan: 20, pendapatan: 400000 },
  { tanggal: "2025-05-28", totalPesanan: 23, pendapatan: 475000 },
];

const laporanBulanan: Laporan[] = [
  { tanggal: "Mei 2025", totalPesanan: 430, pendapatan: 8500000 },
  { tanggal: "April 2025", totalPesanan: 390, pendapatan: 7600000 },
];

export default function ManajerPage() {
  const router = useRouter();
  const [view, setView] = useState<"harian" | "bulanan">("harian");

  useEffect(() => {
    const cookies = document.cookie;
    const isLoggedIn = cookies.includes("isLoggedIn=true");
    const isManajer = cookies.includes("role=manajer");

    if (!isLoggedIn || !isManajer) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Laporan Penjualan - Manajer</h1>

      <Tabs defaultValue="harian" onValueChange={(v) => setView(v as "harian" | "bulanan")}>
        <TabsList>
          <TabsTrigger value="harian">Harian</TabsTrigger>
          <TabsTrigger value="bulanan">Bulanan</TabsTrigger>
        </TabsList>

        <TabsContent value="harian">
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Total Pesanan</TableHead>
                    <TableHead>Pendapatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {laporanHarian.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.tanggal}</TableCell>
                      <TableCell>{item.totalPesanan}</TableCell>
                      <TableCell>Rp {item.pendapatan.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulanan">
          <Card>
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bulan</TableHead>
                    <TableHead>Total Pesanan</TableHead>
                    <TableHead>Pendapatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {laporanBulanan.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.tanggal}</TableCell>
                      <TableCell>{item.totalPesanan}</TableCell>
                      <TableCell>Rp {item.pendapatan.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
