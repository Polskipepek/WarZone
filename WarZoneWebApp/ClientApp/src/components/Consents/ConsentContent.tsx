import React from 'react';
import { FunctionComponent } from 'react';
import { Modal } from 'antd';

export interface IConsentContentModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;

}

const ConsentContentModal: FunctionComponent<IConsentContentModalProps> = (props) => {
    const DisplayRegulations = () => {
        return (
            <div>
                <h2>REGULAMIN STRZELNICY WAR ZONE</h2>
                <h3>Na podstawie: ROZPORZĄDZENIA MINISTRA SPRAW WEWNĘTRZNYCH I ADMINISTRACJI z dnia 15 marca 2000 r. w sprawie wzorcowego regulaminu strzelnic. (Dz. U. Nr 18, poz. 234) oraz ROZPORZĄDZENIA MINISTRA SPRAW WEWNĘTRZNYCH I ADMINISTRACJI z dnia 4 marca 2002 r. zmieniającego rozporządzenie w sprawie wzorcowego regulaminu strzelnic.</h3>
                <p>&nbsp;</p>
                <h3><b>Rozdział 1</b></h3>
                <h3><b>Warunki korzystania ze strzelnicy.</b></h3>
                <p>&nbsp;</p>
                <h3><b>1. Prowadzący strzelanie:</b></h3>
                <h3>1) odpowiada za bezpieczeństwo użytkowników strzelnicy oraz osób im towarzyszących,</h3>
                <h3>2) wyznacza korzystającym ze strzelnicy stanowiska strzeleckie, a osobom towarzyszącym &#8211; miejsce bezpiecznego pobytu,</h3>
                <h3>3) prowadzi książkę rejestru pobytu na strzelnicy, w której zamieszcza się następujące dane:</h3>
                <h3>a)imię i nazwisko korzystającego ze strzelnicy,</h3>
                <h3>b)numer pozwolenia na broń oraz nazwę organu, który je wydał, albo adres korzystającego ze strzelnicy, jeżeli nie posiada on pozwolenia na broń,</h3>
                <h3>c)oświadczenie korzystającego ze strzelnicy o zapoznaniu się z regulaminem strzelnicy i przepisami bezpieczeństwa, potwierdzone własnoręcznym podpisem.</h3>
                <p>&nbsp;</p>
                <h3><b>2. Na strzelnicy zabrania się:</b></h3>
                <h3>1) osobom towarzyszącym osobom korzystającym ze strzelnicy wchodzenia na stanowiska strzeleckie oraz styczności z bronią,</h3>
                <h3>2) używania broni innych osób korzystających ze strzelnicy, bez zgody jej użytkownika,</h3>
                <h3>3) spożywania alkoholu lub używania środków odurzających oraz przebywania na terenie strzelnicy osób będących pod ich wpływem.</h3>
                <h3></h3>
                <p>&nbsp;</p>
                <h3><b>3. Na strzelnicy, w miejscu widocznym, umieszcza się:</b></h3>
                <h3>1) regulamin strzelnicy,</h3>
                <h3>2) decyzję o dopuszczeniu strzelnicy do użytkowania,</h3>
                <h3>3) plan strzelnicy z oznaczeniem:</h3>
                <h3>a) stanowisk strzeleckich,</h3>
                <h3>b) punktu sanitarnego,</h3>
                <h3>c) dróg ewakuacji,</h3>
                <h3>d) miejsca instalacji telefonu lub innych urządzeń łączności,</h3>
                <h3>4) wykaz sygnałów alarmowych,</h3>
                <h3>5) informację o możliwości i sposobie połączenia się z najbliższym punktem pomocy medycznej, </h3>
                <h3>6) Za szkody powstałe podczas strzelania oraz spowodowanie wypadku odpowiada właściciel lub zarządca strzelnicy, prowadzący strzelanie lub trening strzelecki albo korzystający ze strzelnicy, na zasadach określonych w odrębnych przepisach.</h3>
                <p>&nbsp;</p>
                <h3><b>Rozdział 2</b></h3>
                <h3><b>Sposób obchodzenia się z bronią.</b></h3>
                <h3>1. Na terenie strzelnicy poza stanowiskiem strzeleckim nosi się broń rozładowaną z otwartymi komorami nabojowymi, bez pasów i pokrowców. W przypadku pistoletów i rewolwerów dozwolone jest ich noszenie w kaburach. Dopuszcza się inny sposób noszenia broni, jeśli tak stanowi regulamin zawodów.</h3>
                <h3>2. Wyjmowanie broni odbywa się wyłącznie na stanowisku strzeleckim lub treningowym tylko na polecenie prowadzącego strzelanie lub trening strzelecki.</h3>
                <h3>3. Wszelkich czynności związanych z obsługą broni dokonuje się wyłącznie z lufą skierowaną w kierunku kulochwytu, tarcz bądź przedmiotów będących celem na strzelnicy.</h3>
                <h3>4. Strzelanie rozpoczyna się wyłącznie na komendę prowadzącego strzelanie.</h3>
                <h3>5. Zakończenie strzelania zgłasza się prowadzącemu strzelanie.</h3>
                <h3>6. Po zakończeniu strzelania broń rozładowuje się i przedstawia do kontroli prowadzącemu strzelanie oraz opuszcza się stanowisko z bronią z otwartą komorą nabojową.</h3>
                <h3>7. Strzelanie i celowanie na terenie strzelnicy odbywa się wyłącznie na wyznaczonych stanowiskach strzeleckich, do tarcz lub innych przedmiotów będących celem na strzelnicy.</h3>
                <p>&nbsp;</p>
                <h3>Rozdział 3</h3>
                <h3><b>Sposób zachowania się osób przebywających na strzelnicy.</b></h3>
                <h3>1. Korzystający ze strzelnicy jest obowiązany ściśle przestrzegać poleceń wydawanych przez prowadzącego strzelanie.</h3>
                <h3>2. Zabrania się wchodzenia przed stanowisko strzeleckie bez zgody prowadzącego strzelanie.</h3>
                <h3>3. Korzystający ze strzelnicy, z wyjątkiem osoby niepełnosprawnej, obowiązany jest przestrzegać przepisów dotyczących postaw strzeleckich.</h3>
                <h3>4. Po komendzie &#8222;STOP&#8221;, wydanej przez prowadzącego strzelanie lub inną osobę, strzelający bezzwłocznie przerywają strzelanie.</h3>
                <h3>5. Na teren strzelnicy zwierzęta mogą być wprowadzone tylko w wyjątkowych przypadkach oraz obowiązkowo powinny być trzymane na uwięzi i pod ścisłym nadzorem opiekuna.</h3>
                <h3>6. Osobę naruszającą regulamin można usunąć ze strzelnicy.</h3>
                <h3>7. Dzieci mogą przebywać na strzelnicy wyłącznie pod bezpośrednim nadzorem rodziców lub opiekunów.</h3>
            </div>
        );
    }
    return (<>
        <Modal
            width="75vw"
            visible={props.modalVisible}
            onCancel={() => props.setModalVisible(false)}
            footer={null}>

            {DisplayRegulations()}
        </Modal>
    </>);
}
export default ConsentContentModal;