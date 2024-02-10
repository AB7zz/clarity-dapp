
;; title: counter
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;; 

;; constants
;;

;; data vars
(define-data-var counter int 0)
;;

;; data maps
;;

;; public functions  
(define-public (increment)
    (begin 
        (var-set counter (+ (var-get counter) 1))    
        (ok (var-get counter))
    )
)

(define-public (decrement)
    (begin
        (var-set counter (- (var-get counter) 1))    
        (ok (var-get counter))
    )
)
;;

;; read only functions
(define-read-only (get-counter)
    (ok (var-get counter))
)
;;

;; private functions
;;

