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
  { id: 1, nama: "Rina", menu: "Thai Tea", waktu: "10:31", status: "pending" },
  { id: 2, nama: "Doni", menu: "Matcha Latte", waktu: "10:34", status: "proses" },
];

export default function KasirPage() {
  const router = useRouter();
  const [pesanan, setPesanan] = useState<Pesanan[]>([]);

  // Autentikasi untuk role kasir
  useEffect(() => {
    const cookies = document.cookie;
    const isLoggedIn = cookies.includes("isLoggedIn=true");
    const isKasir = cookies.includes("role=kasir");

    if (!isLoggedIn || !isKasir) {
      router.push("/login");
    } else {
      setPesanan(dummyPesanan); // load data dummy
    }
  }, [router]);

  const updateStatus = (id: number, newStatus: Pesanan["status"]) => {
    setPesanan((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Halaman Kasir</h1>
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
          {pesanan.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.nama}</TableCell>
              <TableCell>{p.menu}</TableCell>
              <TableCell>{p.waktu}</TableCell>
              <TableCell className="capitalize">{p.status}</TableCell>
              <TableCell className="space-x-2">
                {p.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(p.id, "proses")}
                  >
                    Proses
                  </Button>
                )}
                {p.status === "proses" && (
                  <Button
                    size="sm"
                    onClick={() => updateStatus(p.id, "selesai")}
                    variant="outline"
                  >
                    Selesai
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
