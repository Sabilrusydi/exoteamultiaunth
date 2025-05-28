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
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

type Pesanan = {
  id: number;
  nama: string;
  menu: string;
  waktu: string;
  status: "pending" | "proses" | "selesai";
};

const dummyPesanan: Pesanan[] = [
  { id: 1, nama: "Rina", menu: "Thai Tea", waktu: "10:31", status: "proses" },
  { id: 2, nama: "Doni", menu: "Matcha Latte", waktu: "10:34", status: "selesai" },
  { id: 3, nama: "Salsa", menu: "Red Velvet", waktu: "11:00", status: "proses" },
];

export default function BaristaPage() {
  const router = useRouter();
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);

  useEffect(() => {
    const cookies = document.cookie;
    const isLoggedIn = cookies.includes("isLoggedIn=true");
    const isBarista = cookies.includes("role=barista");

    if (!isLoggedIn || !isBarista) {
      router.push("/login");
    } else {
      setPesanan(dummyPesanan);
    }
  }, [router]);

  const tandaiSelesai = (id: number) => {
    setPesanan((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "selesai" } : p))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Halaman Barista</h1>
        <Button
          variant="secondary"
          onClick={() => setPesanan(dummyPesanan)}
          className="flex gap-2 items-center"
        >
          <RefreshCcw className="w-4 h-4" />
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
          {pesanan
            .filter((p) => p.status !== "pending")
            .map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.nama}</TableCell>
                <TableCell>{p.menu}</TableCell>
                <TableCell>{p.waktu}</TableCell>
                <TableCell className="capitalize">{p.status}</TableCell>
                <TableCell>
                  {p.status === "proses" && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => tandaiSelesai(p.id)}
                    >
                      Tandai Selesai
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
