//見本

// import { useState } from "react";

// type Form = { name: string; email: string; age: string };
// type Errors = Partial<Record<keyof Form, string>>;

// const emailRe = /^\S+@\S+\.\S+$/;
// const numRe = /^\d+$/;

// export default function App() {
//   const [form, setForm] = useState<Form>({ name: "", email: "", age: "" });
//   const [errors, setErrors] = useState<Errors>({});
//   const [busy, setBusy] = useState(false);

//   const validate = (f: Form): Errors => {
//     const e: Errors = {};
//     if (!f.name.trim()) e.name = "必須";
//     if (!emailRe.test(f.email)) e.email = "形式";
//     if (!numRe.test(f.age)) e.age = "数字";
//     return e;
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const k = e.target.name as keyof Form;
//     const next = { ...form, [k]: e.target.value };
//     setForm(next);
//     setErrors(validate(next)); // 常に簡易チェック
//   };

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const v = validate(form);
//     setErrors(v);
//     if (Object.keys(v).length) return;

//     setBusy(true);
//     // 擬似送信（ここをfetchに置き換えればAPI連携）
//     await new Promise((r) => setTimeout(r, 300));
//     console.log("payload:", { ...form, age: Number(form.age) });
//     setBusy(false);

//     // 結果確認しやすいようにリセット
//     setForm({ name: "", email: "", age: "" });
//     setErrors({});
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       width: '100%'
//     }}>
//       <form onSubmit={onSubmit} style={{
//         display: 'flex',
//         flexDirection: 'column',
//         gap: '1rem',
//         width: '100%',
//         maxWidth: '400px',
//         padding: '2rem',
//         border: '1px solid #ccc',
//         borderRadius: '8px',
//         backgroundColor: '#f9f9f9'
//       }}>
//         <h1 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>フォーム</h1>
        
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//           <input
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={onChange}
//             style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
//           />
//           {errors.name && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name}</span>}
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//           <input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={onChange}
//             inputMode="email"
//             style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
//           />
//           {errors.email && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</span>}
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//           <input
//             name="age"
//             placeholder="Age"
//             value={form.age}
//             onChange={onChange}
//             inputMode="numeric"
//             style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
//           />
//           {errors.age && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.age}</span>}
//         </div>

//         <button 
//           type="submit" 
//           disabled={busy || Object.keys(errors).length > 0}
//           style={{
//             padding: '0.75rem',
//             borderRadius: '4px',
//             border: 'none',
//             backgroundColor: busy || Object.keys(errors).length > 0 ? '#ccc' : '#007bff',
//             color: 'white',
//             cursor: busy || Object.keys(errors).length > 0 ? 'not-allowed' : 'pointer',
//             fontSize: '1rem'
//           }}
//         >
//           {busy ? "送信中..." : "送信"}
//         </button>
//       </form>
//     </div>
//   );
// }

// // Day1
// import{ useState } from 'react';

// // 型定義
// // ageは数字でもええやん→空白文字があったら扱いにくいので文字列としてる
// type Form = { name: string, email: string, age: string}; 
// // ErrorsはFormの各キーに任意のエラーメッセージ(string)を載せる役割。Partialなので存在しない→エラーなし
// type Errors = Partial<Record<keyof Form, string>>;

// //バリデーション
// const emailRe = /^\S+@\S+\.\S+$/;
// const numRe = /^\d+$/;

// export default function App() {
//   const [form, setForm] = useState<Form>({ name: "", email: "", age: ""});
//   const [errors, setErrors] = useState<Errors>({});
//   //busyは送信処理の実行中タグ
//   const [busy, setBusy] = useState(false);

//   const validate = (f: Form): Errors => {
//     const e: Errors = {};
//     //trimすることで空白の場合に空白が除去されてエラーになる
//     if (!f.name.trim()) e.name = "必須";
//     //emailとageを正規化して真偽値バリデーション
//     if(!emailRe.test(f.email)) e.email = "形式";
//     if(!numRe.test(f.age)) e.age = "数字";

//     return e;
//   }

//   //制御
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //Formのどれか、つまりname、email、ageのどれかを変更、入力するたびにvalidate(next)を回してエラー更新
//     const k = e.target.name as keyof Form;
//     //e.target.valueは入力した値でこれがnextに入る
//     const next = { ...form, [k]: e.target.value};
//     setForm(next);
//     setErrors(validate(next)); //常にチェック
//   }

//   //送信
//   const onSubmit = async (e: React.FormEvent) => {
//     //リロードを防ぐ
//     e.preventDefault();
//     const v = validate(form);
//     setErrors(v);
//     //エラーがあれば送信しない、ここでエラーがある項目名の配列を取得して値があるかどうか判断
//     if (Object.keys(v).length) return;

//     setBusy(true);
//     //擬似送信(ここをfetchに変えたらAPI連携)
//     await new Promise((r) => setTimeout(r, 300));
//     console.log("payload", { ...form, age: Number(form.age)});
//     setBusy(false);

//     //結果確認しやすいようにリセット
//     setForm({ name: "", email: "", age: ""});
//     setErrors({});
//   }

//   return (
//     <div>
//       <form 
//       onSubmit={onSubmit}
//       >
//         <h1>フォーム</h1>
//         <div>
//           <input
//            name="name"
//            placeholder="Name"
//            value={form.name}
//            onChange={onChange}
//            />
//            {errors.name && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name}</span>} 
//            {/* エラー条件下で表示 */}
//         </div>
//         <div>
//           <input
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={onChange}
//             inputMode="email"
//            />
//            {errors.email && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</span>}
//         </div>
//         <div>
//         <input
//           name="age"
//           placeholder="Age"
//           value={form.age}
//           onChange={onChange}
//           inputMode="numeric"
//         />
//         {errors.age && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.age}</span>}
//         </div>
//         <button
//           type="submit"
//           disabled={busy || Object.keys(errors).length > 0}
//         >
//           {busy ? "送信中..." : "送信"}
//         </button>
//       </form>
//     </div>
//   );
// }

// // Day2(まずはDay1の復習)
// import { useState} from 'react';

// type Form = { name: string, email: string, age: string};
// type Errors = Partial<Record<keyof Form, string>>;

// const emailRe = /^\S+@\S+\.\S+$/;
// const numRe = /^\d+$/;

// export default function App() {
//   const [form, setForm] = useState<Form>({ name: "", email: "", age: ""});
//   const [errors, setErrors] = useState<Errors>({});
//   const [busy, setBusy] = useState(false);

//   const validate = (f: Form): Errors => {
//     const e: Errors = {};
//     if (!f.name.trim()) e.name = "必須";
//     if (!emailRe.test(f.email)) e.email = "形式";
//     if (!numRe.test(f.age)) e.age = "数字" ;

//     return e;
//   }

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const k = e.target.name as keyof Form;
//     const next = { ...form, [k]: e.target.value};
//     setForm(next);
//     setErrors(validate(next));
//   }

//   const onSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const v = validate(form);
//     setErrors(v);
//     if (Object.keys(v).length) return;

//     setBusy(true);
//     await new Promise((r) => setTimeout(r, 300));
//     console.log("payload", { ...form, age: Number(form.age)});
//     setBusy(false);

//     setForm({ name: "", email: "", age: ""});
//     setErrors({});
//   }

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <h1>フォーム</h1>
//         <div>
//           <input
//             name="name" 
//             placeholder="Name"
//             value={form.name}
//             onChange={onChange}
//            />
//            {errors.name && <span style={{ color: 'red', fontSize: '0.875rem'}}>{errors.name}</span>}
//         </div>
//         <div>
//           <input
//             name="email" 
//             placeholder="Email"
//             value={form.email}
//             onChange={onChange}
//             inputMode="email"
//            />
//            {errors.email && <span style={{ color: 'red', fontSize: '0.875rem'}}>{errors.email}</span>}
//         </div>
//         <div>
//           <input
//             name="age" 
//             placeholder="Age"
//             value={form.age}
//             onChange={onChange}
//             inputMode="numeric"
//            />
//            {errors.age && <span style={{ color: 'red', fontSize: '0.875rem'}}>{errors.age}</span>}
//         </div>
//         <button
//           type="submit"
//           disabled={busy || Object.keys(errors).length > 0}
//         >
//           {busy ? "送信中" : "送信"}
//         </button>
//       </form>
//     </div>
//   );
// }

// Day2

