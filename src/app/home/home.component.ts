import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  titulo: string = 'Nossa história'
  conteudo: string = `Nossa trajetória se iniciou em 2008, no dia 06 dezembro, iniciamos nossos trabalhos na garagem da dona Maria Senhora.
  Uma mulher temente a Deus, passado algum tempo, deu-se início a construção do tempo na Qn 14C, Conjunto 4, lote 12 no Riacho Fundo 2,
  aquela que nasceu como uma congregação da igreja-mãe do Guará, agora se tornava uma igreja independente, e até aqui o senhor vem nos sustentando,
  passamos por dificuldades, mas tudo podemos Naquele que nos fortalece.`
}
