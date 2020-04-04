import * as fs from "fs";

// 前計算して100個ごとに並べておきました
const table = [0, 878, 4445, 8788, 21122, 33322, 45434, 56776, 76667, 88888, 110111, 122345, 221122, 233322, 323234, 343211, 432332, 444444, 456556, 545676, 565566, 655543, 667655, 765432, 776767, 788989, 887765, 987777, 1001012, 1101111, 1122111, 1212233, 1232232, 2101234, 2122234, 2221010, 2233211, 2322345, 2334544, 3210122, 3223212, 3234555, 3332332, 3344444, 3434343, 3445677, 4321222, 4333344, 4345456, 4443211, 4454545, 4544443, 4556555, 4567889, 5443345, 5455543, 5545433, 5556767, 5654444, 5666556, 5677899, 6545667, 6565565, 6655456, 6667654, 6678999, 6776766, 6788988, 7665434, 7676777, 7766767, 7778889, 7877666, 7889987, 8767676, 8787667, 8877789, 8898789, 8998887, 9887656, 9987676, 10000121, 10101001, 10121223, 11010111, 11110123, 11123221, 11221212, 11233334, 12111123, 12123344, 12222122, 12234321, 12323455, 12343432, 21010010, 21110101, 21122343, 21221112, 21233234, 22111101, 22123322, 22222100, 22233443, 22323433, 22343332, 23211223, 23223444, 23321212, 23333334, 23345454, 23434567, 23454543, 32110010, 32122323, 32221100, 32233222, 32323212, 32334555, 33211001, 33223223, 33234566, 33332343, 33344455, 33434432, 33454322, 34321233, 34333433, 34345545, 34443222, 34454556, 34544454, 34556566, 43210000, 43222321, 43234434, 43332211, 43344323, 43433444, 43445556, 44321101, 44333223, 44344565, 44434456, 44454432, 44544322, 44555656, 44567776, 45443232, 45454566, 45544456, 45556654, 45654323, 45665665, 45677778, 54323432, 54343323, 54433222, 54444556, 54456676, 54554344, 54565678, 55433434, 55445554, 55543222, 55554556, 55566676, 55656567, 55676544, 56543456, 56555654, 56567766, 56665443, 56676778, 56766776, 56778898, 65433232, 65444566, 65456678, 65554432, 65566544, 65655665, 65667777, 66543332, 66555444, 66566778, 66656677, 66676654, 66766566, 66778766, 67654543, 67666655, 67678777, 67776545, 67788766, 67878888, 67899987, 76554445, 76566565, 76655678, 76667876, 76765567, 76777766, 77654322, 77665656, 77677777, 77767767, 77787766, 77877888, 77898888, 78767898, 78787889, 78878876, 78899888, 78999987, 87665556, 87677677, 87767667, 87787666, 87877788, 87898788, 88767876, 88787789, 88878776, 88898998, 88999878, 89887778, 89987876, 98765666, 98777787, 98876565, 98888778, 98988876, 99877776, 99898776, 99998788, 100012110, 100112122, 101000100, 101100112, 101121210, 101212111, 101232110, 110001112, 110101210, 110122210, 111011110, 111111122, 111123343, 111222121, 111233456, 112112110, 112210001, 112222322, 112234443, 112332212, 112344332, 121011001, 121111100, 121123321, 121221234, 121233434, 122111223, 122123444, 122222222, 122234343, 122332112, 122343454, 123212210, 123232123, 123322121, 123333456, 123345654, 123443323, 123455443, 210011001, 210111100, 210123321, 211012222, 211112234, 211211010, 211223232, 211234567, 212121011, 212211212, 212223433, 212321123, 212333323, 212345443, 221012122, 221112212, 221210112, 221223210, 221234545, 222112343, 222211112, 222223333, 222321101, 222333223, 222344565, 223221112, 223233234, 223323232, 223334567, 223432322, 223444434, 223456554, 232112122, 232210100, 232222334, 232234455, 232332232, 232344344, 233212322, 233232321, 233322233, 233334432, 233432101, 233443443, 233455555, 234323323, 234343222, 234432343, 234444455, 234456567, 234554321, 234565655, 321010012, 321110111, 321122345, 321221122, 321233322, 322111111, 322123332, 322222110, 322233445, 322323443, 322343334, 323211233, 323223454, 323321222, 323333344, 323345456, 323443211, 323454545, 332110012, 332122333, 332221110, 332233232, 332323222, 332334565, 333211011, 333223233, 333321000, 333332345, 333344543, 333434434, 333454332, 334322100, 334333443, 334345555, 334443232, 334454566, 334544456, 334556654, 343210010, 343222323, 343234444, 343332221, 343344333, 343433454, 343445566, 344321111, 344333233, 344344567, 344434544, 344454434, 344544332, 344555666, 344567778, 345443234, 345455432, 345544544, 345556656, 345654333, 345665667, 345677788, 432111233, 432123454, 432222232, 432234345, 432332122, 432343456, 433212212, 433232211, 433322123, 433334322, 433345656, 433443333, 433455445, 434323221, 434334556, 434432233, 434444345, 434456543, 434545655, 434565545, 443211223, 443223444, 443321212, 443333334, 443345454, 443434567, 443454543, 444322233, 444334432, 444432101, 444443443, 444455555, 444545445, 444556787, 445432321, 445444433, 445456545, 445545665, 445565555, 445655454, 445666788, 445678989, 454332334, 454344454, 454434345, 454454321, 454543433, 454555545, 454567665, 455434565, 455454455, 455544345, 455556543, 455567877, 455665554, 455677667, 456545443, 456556777, 456654454, 456666566, 456678766, 456767899, 456787898, 543221010, 543233211, 543322345, 543334544, 543432221, 543444333, 543455667, 544323443, 544343334, 544433233, 544444567, 544456765, 544554433, 544566545, 545433445, 545445565, 545543233, 545554567, 545566765, 545656656, 545676555, 554322123, 554334322, 554345656, 554443333, 554455445, 554544565, 554556677, 555432211, 555444323, 555455665, 555545555, 555565445, 555654566, 555666678, 555678878, 556554345, 556566543, 556655656, 556667776, 556765545, 556777666, 556789987, 565443343, 565455455, 565544567, 565556765, 565654434, 565666554, 565677889, 566545665, 566565555, 566655454, 566666788, 566678989, 566776678, 566788899, 567665432, 567676767, 567766765, 567778887, 567877656, 567889898, 654323322, 654343221, 654432334, 654444454, 654456566, 654545678, 654565654, 655433332, 655445444, 655456778, 655554454, 655566566, 655656543, 655667877, 656543432, 656555544, 656567656, 656656777, 656676676, 656766666, 656778788, 665432344, 665444456, 665456654, 665554322, 665565656, 665655555, 665667667, 666543222, 666554556, 666566676, 666656567, 666676544, 666765678, 666777877, 667654433, 667666545, 667677888, 667767878, 667787877, 667878778, 667899876, 676554343, 676565677, 676655654, 676667766, 676765543, 676777656, 676789898, 677665554, 677677667, 677767665, 677787656, 677877778, 677898778, 678767788, 678787787, 678878766, 678898988, 678999876, 765443233, 765454567, 765544543, 765556655, 765654332, 765665666, 765677787, 766545555, 766565445, 766654566, 766666678, 766678878, 766776654, 766788789, 767656766, 767676665, 767766655, 767778777, 767876776, 767888998, 776544556, 776556676, 776654345, 776666543, 776677878, 776767876, 776787789, 777656545, 777667887, 777765656, 777777777, 777876555, 777888776, 778766565, 778778765, 778876678, 778888899, 778988998, 787655667, 787667787, 787765556, 787777677, 787789998, 787887889, 788766543, 788777878, 788876656, 788888877, 788988889, 789877789, 789898789, 789998887, 876545667, 876565565, 876655456, 876667654, 876678999, 876776766, 876788988, 877665434, 877676777, 877766767, 877778889, 877877666, 877889987, 878767676, 878787667, 878877789, 878898789, 878998887, 887656778, 887676677, 887766667, 887778789, 887876788, 887889878, 888767654, 888778999, 888877767, 888898767, 888998787, 889878988, 889987654, 898765444, 898776787, 898789877, 898887777, 898987789, 899876776, 899888998, 899989878, 987656543, 987667877, 987765654, 987777767, 987876545, 987888766, 988766555, 988777898, 988876676, 988888889, 988988988, 989877887, 989898887, 989998899, 998776544, 998788765, 998878887, 998899899, 998999998, 999887889, 999988766, 1000001223, 1000110000, 1000122321, 1001011221, 1001111233, 1001123454, 1001222232, 1001234345, 1010012221, 1010112233, 1011001001, 1011101100, 1011122100, 1011212222, 1011232221, 1012101223, 1012122223, 1012212345, 1012232344, 1012322334, 1012334455, 1100000111, 1100100123, 1100121221, 1101010101, 1101110121, 1101123211, 1101221210, 1101233332, 1110011121, 1110111211, 1110123432, 1111012333, 1111112345, 1111211122, 1111223343, 1112100111, 1112121123, 1112212110, 1112232101, 1112321234, 1112333434, 1112345554, 1121012233, 1121112323, 1121211100, 1121223321, 1122100010, 1122121101, 1122211223, 1122223444, 1122321212, 1122333334, 1122345454, 1123221223, 1123233345, 1123323343, 1123343234, 1123433211, 1123444545, 1123456665, 1210012233, 1210112323, 1211001100, 1211101112, 1211122112, 1211212234, 1211232233, 1212110000, 1212122321, 1212221011, 1212233212, 1212323210, 1212334545, 1221000123, 1221101011, 1221121233, 1221212212, 1221232211, 1222101221, 1222122221, 1222212343, 1222232334, 1222322332, 1222334445, 1223210101, 1223222343, 1223234456, 1223332233, 1223344345, 1223434322, 1223445656, 1232100123, 1232121221, 1232212122, 1232232121, 1232322111, 1232333454, 1232345566, 1233222122, 1233234321, 1233323455, 1233343432, 1233433323, 1233445443, 1233456777, 1234332332, 1234344444, 1234434343, 1234445677, 1234543345, 1234555543, 1234567655, 2100012121, 2100112211, 2101000111, 2101100123, 2101121221, 2101212122, 2101232121, 2110001123, 2110101221, 2110122221, 2111011121, 2111111211, 2111123432, 2111222210, 2111234323, 2112112121, 2112210012, 2112222333, 2112234454, 2112332223, 2112344343, 2121011012, 2121111111, 2121123332, 2121222110, 2121233445, 2122111234, 2122123455, 2122222233, 2122234432, 2122332123, 2122344321, 2123212221, 2123232212, 2123322210, 2123334323, 2123345665, 2123443334, 2123455454, 2210011012, 2210111111, 2210123332, 2211012233, 2211112323, 2211211100, 2211223321, 2212100010, 2212121101, 2212211223, 2212223444, 2212321212, 2212333334, 2212345454, 2221012211, 2221112223, 2221210123, 2221223221, 2221234556, 2222121000, 2222211123, 2222223344, 2222321112, 2222333234, 2222345432, 2223221123, 2223233323, 2223323321, 2223343212, 2223432333, 2223444445, 2223456565, 2232112211, 2232210111, 2232222345, 2232234544, 2232332321, 2232344433, 2233212333, 2233232332, 2233322322, 2233334443, 2233432112, 2233443454, 2233455566, 2234323334, 2234343233, 2234433210, 2234444544, 2234456656, 2234554332, 2234565666, 2321010110, 2321110122, 2321123212, 2321221211, 2321233333, 2322111122, 2322123343, 2322222121, 2322233456, 2322323454, 2322343345, 2323212101, 2323232100, 2323321233, 2323333433, 2323345545, 2323443222, 2323454556, 2332110110, 2332122344, 2332221121, 2332233321, 2332323233, 2332343210, 2333211101, 2333223322, 2333321011, 2333333212, 2333344554, 2333434445, 2333454343, 2334322111, 2334333454, 2334345566, 2334443321, 2334455433, 2334544545, 2334556665, 2343210100, 2343222334, 2343234455, 2343332232, 2343344344, 2343434321, 2343445655, 2344321122, 2344333322, 2344345434, 2344434555, 2344454445, 2344544343, 2344555677, 2344567789, 2345443323, 2345455443, 2345544555, 2345556667, 2345654344, 2345665678, 2345677877, 3210012101, 3210112121, 3211000012, 3211100111, 3211121123, 3211212110, 3211232101, 3212101111, 3212122111, 3212212233, 3212232232, 3212322222, 3212334343, 3212345677, 3221100010, 3221121101, 3221211223, 3221223444, 3222101010, 3222121232, 3222212211, 3222232210, 3222322122, 3222334321, 3222345655, 3223222211, 3223234332, 3223332101, 3223343443, 3223433334, 3223445454, 3223456788, 3232121010, 3232211211, 3232223432, 3232321122, 3232333322, 3232345434, 3233221211, 3233233333, 3233323323, 3233343222, 3233432343, 3233444455, 3233456567, 3234332122, 3234343456, 3234433433, 3234445545, 3234543221, 3234554555, 3234566667];

function check(n: number) {
	const s = n + "";
	let c = s[0];
	for (let i = 0; i < s.length; i++) {
		if (Math.abs((+s[i]) - (+c)) > 1) return s.length - 1 - i;
		c = s[i];
	}
	return -1;
}

const sep = 100;
const input = (fs.readFileSync("/dev/stdin", "utf8") as string).split("\n");
const k = +input[0];
const index = Math.floor(k / sep);

if (k % sep === 0) {
	console.log(table[index]);
} else {
	let count = index * sep;
	for (let i = table[index] + 1; i <= 3234566667; i++) {
		const d = check(i);
		if (d === -1) {
			count++;
		} else if (d > 3) {
			i += 99;
		}
		if (count === k) {
			console.log(i);
			break;
		}
	}

}