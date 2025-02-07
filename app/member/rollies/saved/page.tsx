// "use client";

// import BackButton from "@/components/backButton/BackButton";
// import Header from "@/components/header/Header";
// import styles from "./page.module.scss";
// import { useRouter } from "next/navigation";
// import RollyListItemDto from "@/application/usecases/rollyListItem/dto/RollyListItemDto";
// import { useEffect, useState } from "react";
// import { SbRollyListItemRepository } from "@/infrastructure/repositories/SbRollyListItemRepository";
// import { DfRollyListItemUsecase } from "@/application/usecases/rollyListItem/DfRollyListItemUsecase";
// import RollyListItem from "@/components/rollyListItem/RollyListItem";

// const Index: React.FC = () => {
//   const [rollyListItems, setRollyListItem] = useState<RollyListItemDto[]>([]);
//   const repository = new SbRollyListItemRepository();
//   const rollyListItemUsecase = new DfRollyListItemUsecase(repository);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await rollyListItemUsecase.execute();
//       console.log("Fetched Rolly List:", data);
//       setRollyListItem(data);
//     };

//     fetchData();
//   }, []);

//   const handleItemClick = (id: number) => {
//     router.push(`/rollies/${id}`);
//   };

//   const handleReply = () => {
//     router.push(`/reply/`);
//   };
//   return (
//     <div>
//       <div className={styles["header"]}>
//         <Header leftContent={<BackButton />} title="내가 받은 롤리" />
//       </div>
//       <p className={styles["list-title"]}>롤리 리스트</p>
//       <div className={styles["list"]}>
//         {rollyListItems.map((rollyListItem) => (
//           <RollyListItem
//             key={rollyListItem.id}
//             id={rollyListItem.id}
//             title={rollyListItem.title}
//             date={rollyListItem.createAt.slice(0, 10)}
//             onClick={() => handleItemClick(rollyListItem.id)}
//             variant={"saved"}
//             onReply={rollyListItem.typeId === 1 ? handleReply : undefined}
//             isLocked={true}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Index;
