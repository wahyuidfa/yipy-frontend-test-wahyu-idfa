import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { token } = useAuth();
  const [data, setData] = useState([]);

  const getData = () => {
    console.log(token, "token");
    axios
      .get("/api/getData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <main className={` min-h-screen w-full p-10 md:p-20 ${inter.className}`}>
      <Navbar />
      <div className='mt-10'>
        <Alert>
          <Terminal className='h-4 w-4' />
          <AlertTitle>
            Hallo, {data.user ? data.user : "Belum ada nama"}
          </AlertTitle>
          <AlertDescription>
            Kamu akan mendapatkan data dan nama dari API ini dengan menekan
            tombol dibawah!
          </AlertDescription>
        </Alert>
        <div className='justify-center flex my-4'>
          <Button onClick={getData}>
            Klik Tombol ini untuk mendapatkan data
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Data</CardTitle>
            <CardDescription>This is data from bearer</CardDescription>
          </CardHeader>
          <CardContent
            className='opacity-0 animate__animated animate__fadeIn
            animate__delay-3s '>
            {data?.data?.map((ed, i) => (
              <div
                key={i}
                className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0'>
                <span className='flex h-2 w-2 translate-y-1 rounded-full bg-sky-500' />
                <div className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>{ed.text}</p>
                  <p className='text-sm text-muted-foreground'>{ed.text}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className='justify-center flex my-4'>
          <Button onClick={getData}>
            <Link href={"/login"}>Logout</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
