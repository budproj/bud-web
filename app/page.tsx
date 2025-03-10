import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCustom } from "@/components/ui/custom-progress";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-96">
        <div className="container mx-auto">
          <div className="flex flex-row gap-4 items-center py-24">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold text-3xl">
              Que bom te ver de novamente, Morty! :)
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-screen">
        <div className="container mx-auto flex flex-col gap-y-6">
          <span className="text-white font-bold text-sm p-1">
            Visão geral dos OKRs
          </span>
          <div className="grid grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>OKRs Anuais Empresa</CardTitle>
                <CardDescription>
                  Check-in realizado há 2 dias por Flavia Castro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={33} className="text-indigo-500" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>OKRs Q1 Digital Management</CardTitle>
                <CardDescription>
                  Check-in realizado há 4 dias por Rodrigo Seiji
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={55} />
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-6 gap-4 bg-white p-4 rounded-lg">
          <Card className="bg-indigo-200 text-center font-bold uppercase text-indigo-500">
              <CardHeader>
                <CardTitle>Alcançado</CardTitle>
                <CardDescription className="text-indigo-500">
                  1
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-green-50 text-center font-bold uppercase text-green-500">
              <CardHeader>
                <CardTitle>Alta Confiança</CardTitle>
                <CardDescription className="text-green-500">
                  9
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-amber-100 text-center font-bold uppercase text-amber-500">
              <CardHeader>
                <CardTitle>Média Confiança</CardTitle>
                <CardDescription className="text-amber-500">
                  4
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-rose-50 text-center font-bold uppercase text-rose-500">
              <CardHeader>
                <CardTitle>Baixa Confiança</CardTitle>
                <CardDescription className="text-rose-500">
                  1
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-purple-100 text-center font-bold uppercase text-purple-500">
              <CardHeader>
                <CardTitle>Com Barreira</CardTitle>
                <CardDescription className="text-purple-500">
                  0
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gray-300 text-center font-bold uppercase text-gray-500">
              <CardHeader>
                <CardTitle>Despriorizado</CardTitle>
                <CardContent className="text-gray-500">
                  0
                </CardContent>
              </CardHeader>
            </Card>
            <div className="w-[1500px]" >
            <ProgressCustom segments={[
              { value: 7 , color: "bg-indigo-500"},
              { value: 60, color: "bg-green-500" },
              { value: 27, color: "bg-amber-500" },
              { value: 7, color: "bg-rose-500" },
            ]}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
